export enum UserRole {
  Admin = 'admin',
  Trainer = 'trainer',
  Client = 'client',
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
}
