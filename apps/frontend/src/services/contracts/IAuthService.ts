import { UserSession } from '@/types/domain';

export interface RegisterStudentInput {
  fullName: string;
  email: string;
  password: string;
  studentNumber: string;
}

export interface IAuthService {
  getCurrentUser(): Promise<UserSession | null>;
  loginAsOfficer(email?: string, password?: string): Promise<UserSession>;
  loginAsStudent(
    email?: string,
    passwordOrName?: string,
    studentNumber?: string
  ): Promise<UserSession>;
  registerStudent?(input: RegisterStudentInput): Promise<UserSession>;
  logout(): Promise<void>;
}
