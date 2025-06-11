export enum UserRole {
  Admin = 'admin',
  Trainer = 'trainer',
  Client = 'client',
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}

export interface CurrentUser extends User {
  trainer: User | null;
  invitationAcceptedAt: Date;
}

export interface UserRegisterRequest {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface AuthTokenResponse {
  token: string;
}
