import { IAuthService } from '../contracts/IAuthService';
import { UserSession } from '@/types/domain';
import { mockStore } from '@/data/mockStore';

export class InMemoryAuthService implements IAuthService {
  async getCurrentUser(): Promise<UserSession | null> {
    const u = mockStore.getState().currentUser;
    if (!u) return null;
    return {
      id: u.userId,
      name: u.fullName,
      email: u.email,
      role: u.role,
      assignedPostId: u.assignedPostId,
      studentNumber: u.studentNumber,
    };
  }

  async loginAsOfficer(email?: string): Promise<UserSession> {
    const user: UserSession = {
      id: 'officer-01',
      name: 'Petugas Pos Pengajaran',
      email: email || 'petugas.pengajaran@budiluhur.ac.id',
      role: 'OFFICER',
      assignedPostId: 1,
    };

    mockStore.getState().currentUser = {
      userId: user.id,
      fullName: user.name,
      email: user.email,
      role: user.role,
      assignedPostId: user.assignedPostId || 1,
      studentNumber: null,
    };

    mockStore.publish();
    return user;
  }

  async loginAsStudent(email?: string): Promise<UserSession> {
    const user: UserSession = {
      id: 'student-01',
      name: 'Mahasiswa Demo',
      email: email || 'mahasiswa@example.invalid',
      role: 'STUDENT',
      studentNumber: '0000000000',
    };

    mockStore.getState().currentUser = {
      userId: user.id,
      fullName: user.name,
      email: user.email,
      role: user.role,
      assignedPostId: null,
      studentNumber: user.studentNumber || '0000000000',
    };

    mockStore.publish();
    return user;
  }

  async logout(): Promise<void> {
    mockStore.getState().currentUser = null;
    mockStore.publish();
  }
}
