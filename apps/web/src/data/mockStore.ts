import {
  InventoryOfficerDto,
  FoundSubmissionDto,
  ServicePostPublicDto,
  ItemReturnDto,
  UserRole,
} from '@/types/api';

import { INITIAL_MOCK_STATE } from './fixtures/initialState';
import { clearMockUploads } from '@/services/in-memory/mockUploads';
export { INITIAL_MOCK_STATE } from './fixtures/initialState';
export interface MockState {
  histories: import('@/types/domain').ReportHistory[];
  storageLimits: Record<number, number | null>;
  posts: ServicePostPublicDto[];
  items: InventoryOfficerDto[];
  submissions: FoundSubmissionDto[];
  returns: ItemReturnDto[];
  currentUser: {
    userId: string;
    fullName: string;
    email: string;
    role: UserRole;
    assignedPostId: number | null;
    studentNumber: string | null;
  } | null;
}

class MockStore {
  private state: MockState = structuredClone(INITIAL_MOCK_STATE);
  private revision = 0;
  private listeners = new Set<() => void>();
  getState(): MockState {
    return this.state;
  }
  getVersion = () => this.revision;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };
  publish() {
    this.revision += 1;
    this.listeners.forEach((listener) => listener());
  }
  reset() {
    clearMockUploads();
    this.state = structuredClone(INITIAL_MOCK_STATE);
    this.publish();
  }
}
export const mockStore = new MockStore();
