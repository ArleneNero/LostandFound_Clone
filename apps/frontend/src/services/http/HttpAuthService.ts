import { IAuthService, RegisterStudentInput } from '../contracts/IAuthService';
import { UserSession } from '@/types/domain';
import { ApiDataResponse, OfficerLoginResponseDto, MeDto } from '@/types/api';
import { apiClient, setAuthToken, getAuthToken } from './apiClient';
import { mockStore } from '@/data/mockStore';

export class HttpAuthService implements IAuthService {
  async getCurrentUser(): Promise<UserSession | null> {
    const token = getAuthToken();
    if (!token) {
      return null;
    }

    try {
      const res = await apiClient<ApiDataResponse<MeDto>>('/me');
      const u = res.data;
      const session: UserSession = {
        id: u.user_id,
        name: u.full_name,
        email: u.email,
        role: u.role,
        assignedPostId: u.assigned_post_id,
        studentNumber: u.student_number,
      };

      // Sync local store
      mockStore.getState().currentUser = {
        userId: session.id,
        fullName: session.name,
        email: session.email,
        role: session.role,
        assignedPostId: session.assignedPostId ?? 1,
        studentNumber: session.studentNumber ?? null,
      };

      return session;
    } catch {
      setAuthToken(null);
      mockStore.getState().currentUser = null;
      return null;
    }
  }

  async loginAsOfficer(email?: string, password?: string): Promise<UserSession> {
    const res = await apiClient<ApiDataResponse<OfficerLoginResponseDto>>('/auth/officer-login', {
      method: 'POST',
      body: JSON.stringify({
        email: email || '',
        password: password || '',
      }),
    });

    const { token, user } = res.data;
    setAuthToken(token);

    const session: UserSession = {
      id: user.user_id,
      name: user.full_name,
      email: user.email,
      role: user.role,
      assignedPostId: user.assigned_post_id,
      studentNumber: user.student_number,
    };

    // Sync local store
    mockStore.getState().currentUser = {
      userId: session.id,
      fullName: session.name,
      email: session.email,
      role: session.role,
      assignedPostId: session.assignedPostId ?? 1,
      studentNumber: session.studentNumber ?? null,
    };

    return session;
  }

  async loginAsStudent(
    email?: string,
    passwordOrName?: string,
    _studentNumber?: string
  ): Promise<UserSession> {
    const res = await apiClient<ApiDataResponse<{ token: string; user: MeDto }>>(
      '/auth/student-login',
      {
        method: 'POST',
        body: JSON.stringify({
          email: email || '',
          password: passwordOrName || '',
        }),
      }
    );

    const { token, user } = res.data;
    setAuthToken(token);

    const session: UserSession = {
      id: user.user_id,
      name: user.full_name,
      email: user.email,
      role: user.role,
      assignedPostId: user.assigned_post_id,
      studentNumber: user.student_number,
    };

    // Sync local store
    mockStore.getState().currentUser = {
      userId: session.id,
      fullName: session.name,
      email: session.email,
      role: session.role,
      assignedPostId: session.assignedPostId ?? 1,
      studentNumber: session.studentNumber ?? null,
    };

    return session;
  }

  async registerStudent(input: RegisterStudentInput): Promise<UserSession> {
    const res = await apiClient<ApiDataResponse<{ token: string; user: MeDto }>>(
      '/auth/student-register',
      {
        method: 'POST',
        body: JSON.stringify({
          full_name: input.fullName,
          email: input.email,
          password: input.password,
          student_number: input.studentNumber,
        }),
      }
    );

    const { token, user } = res.data;
    setAuthToken(token);

    const session: UserSession = {
      id: user.user_id,
      name: user.full_name,
      email: user.email,
      role: user.role,
      assignedPostId: user.assigned_post_id,
      studentNumber: user.student_number,
    };

    // Sync local store
    mockStore.getState().currentUser = {
      userId: session.id,
      fullName: session.name,
      email: session.email,
      role: session.role,
      assignedPostId: session.assignedPostId ?? 1,
      studentNumber: session.studentNumber ?? null,
    };

    return session;
  }

  async logout(): Promise<void> {
    setAuthToken(null);
    mockStore.getState().currentUser = null;
  }
}
