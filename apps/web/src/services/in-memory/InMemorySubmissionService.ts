import type {
  ISubmissionService,
  GetSubmissionsParams,
  CreateSubmissionInput,
  ReceiveSubmissionInput,
} from '../contracts/ISubmissionService';
import type { FoundSubmissionDto } from '@/types/api';
import { mapSubmissionDtoToDomain, mapItemDtoToDomain } from '@/types/domain/mappers';
import { mockStore } from '@/data/mockStore';
import { requireOfficer, requireOwnedReport } from './policies';
import { consumeMockUpload, resolveMockUpload } from './mockUploads';
import { buildItem } from './itemFactory';
import { paginate } from './paginate';

function mapReport(report: FoundSubmissionDto) {
  return {
    ...mapSubmissionDtoToDomain(report),
    history: structuredClone(
      mockStore.getState().histories.filter((h) => h.submissionId === report.submission_id),
    ),
  };
}
function transition(
  report: FoundSubmissionDto,
  to: 'RECEIVED' | 'REJECTED',
  reason: string | null,
) {
  const actor = requireOfficer();
  const state = mockStore.getState();
  if (!state.histories.some((h) => h.submissionId === report.submission_id)) {
    state.histories.push({
      id: crypto.randomUUID(),
      submissionId: report.submission_id,
      actorId: 'demo-reporter',
      from: null,
      to: 'PENDING_RECEIPT',
      reason: null,
      changedAt: report.submitted_at,
    });
  }
  state.histories.push({
    id: crypto.randomUUID(),
    submissionId: report.submission_id,
    actorId: actor.userId,
    from: report.status,
    to,
    reason,
    changedAt: new Date().toISOString(),
  });
  report.status = to;
}
function pendingReport(id: string) {
  const report = requireOwnedReport(id);
  if (report.status !== 'PENDING_RECEIPT')
    throw new Error(`Laporan tidak dapat diproses karena berstatus ${report.status}`);
  return report;
}
export class InMemorySubmissionService implements ISubmissionService {
  async getSubmissions(params?: GetSubmissionsParams) {
    const user = requireOfficer();
    let list = mockStore
      .getState()
      .submissions.filter((s) => s.target_post_id === user.assignedPostId);
    if (params?.status) list = list.filter((s) => s.status === params.status);
    list = [...list].sort((a, b) => b.submitted_at.localeCompare(a.submitted_at));
    return paginate(list.map(mapReport), params?.page, params?.limit);
  }
  async getSubmissionById(id: string) {
    return mapReport(requireOwnedReport(id));
  }
  async createSubmission(input: CreateSubmissionInput) {
    const state = mockStore.getState();
    const user = state.currentUser;
    if (!user || user.role !== 'STUDENT')
      throw new Error('Akun Mahasiswa diperlukan untuk membuat laporan.');
    if (
      !input.itemName.trim() ||
      !input.category.trim() ||
      !input.description.trim() ||
      !input.foundLocation.trim() ||
      !input.foundDate
    )
      throw new Error('Lengkapi informasi laporan.');
    if (!state.posts.some((p) => p.post_id === input.targetPostId))
      throw new Error('Pos tujuan tidak valid.');
    const upload = resolveMockUpload(input.photoToken, 'REPORT_PHOTO', user.userId);
    const now = new Date().toISOString();
    const report: FoundSubmissionDto = {
      submission_id: crypto.randomUUID(),
      report_code: `REP-${new Date().getFullYear()}-${String(state.submissions.length + 1).padStart(4, '0')}`,
      target_post_id: input.targetPostId,
      item_name: input.itemName.trim(),
      category: input.category,
      public_description: input.description.trim(),
      found_location: input.foundLocation.trim(),
      found_on: input.foundDate,
      status: 'PENDING_RECEIPT',
      submitted_at: now,
      report_photo_url: upload.url,
      report_photo_expires_at: new Date(Date.now() + 86400000).toISOString(),
    };
    consumeMockUpload(input.photoToken);
    state.submissions.unshift(report);
    state.histories.push({
      id: crypto.randomUUID(),
      submissionId: report.submission_id,
      actorId: user.userId,
      from: null,
      to: 'PENDING_RECEIPT',
      reason: null,
      changedAt: now,
    });
    mockStore.publish();
    return mapReport(report);
  }
  async receiveSubmission(id: string, input: ReceiveSubmissionInput) {
    const report = pendingReport(id);
    if (mockStore.getState().items.some((i) => i.source_submission_id === id))
      throw new Error('Barang dari laporan ini sudah dicatat.');
    const item = buildItem(
      {
        name: report.item_name,
        category: report.category,
        description: input.publicDescription,
        foundLocation: report.found_location,
        foundDate: report.found_on,
        privateNotes: input.privateNotes,
        photoToken: input.photoToken,
      },
      report.submission_id,
    );
    consumeMockUpload(input.photoToken);
    mockStore.getState().items.unshift(item);
    transition(report, 'RECEIVED', null);
    mockStore.publish();
    return mapItemDtoToDomain(item);
  }
  async rejectSubmission(id: string, reason: string) {
    const report = pendingReport(id);
    const trimmed = reason.trim();
    if (!trimmed) throw new Error('Alasan penolakan wajib diisi');
    transition(report, 'REJECTED', trimmed);
    mockStore.publish();
    return mapReport(report);
  }
}
