import { User } from "@/types/User";

export enum InvitationStatus {
  Pending = 'Pending',
  Accepted = 'Accepted',
  Rejected = 'Rejected',
}

export interface Invitation {
  id: number;
  clientId: number;
  client: User;
  trainerId: number;
  trainer: User;
  initiatorId: number;
  status: InvitationStatus;
  message?: string;
  createdAt: Date;
  resolvedAt?: Date;
}

export interface CreateInvitationRequest {
  clientEmail?: string;
  trainerEmail?: string;
  message?: string;
}