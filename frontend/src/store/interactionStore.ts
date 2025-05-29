import interactionService from '@/api/services/interactionService';
import { getErrorMessage } from '@/lib/utils';
import { CreateInvitationRequest, Invitation, InvitationStatus } from '@/types/Interaction';
import { makeAutoObservable, runInAction } from 'mobx';

export default class InteractionStore {
  invitations: Invitation[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  fetchInvitations = async () => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const invitations = await interactionService.getInvitations();
      runInAction(() => {
        this.invitations = invitations;
      });
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    }

    runInAction(() => {
      this.isLoading = false;
    });
  };

  createInvitation = async (invitation: CreateInvitationRequest) => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const newInvitation = await interactionService.createInvitation(invitation);
      runInAction(() => {
        this.invitations.push(newInvitation);
      });
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    }

    runInAction(() => {
      this.isLoading = false;
    });
  };

  resolveInvitation = async (invitationId: number, status: InvitationStatus) => {
    try {
      const updatedInvitation = await interactionService.resolveInvitation(invitationId, status);
      runInAction(() => {
        this.invitations = this.invitations.map((i) => i.id === invitationId ? updatedInvitation : i);
      });
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    }
  };

  deleteInvitation = async (invitationId: number) => {
    try {
      await interactionService.deleteInvitation(invitationId);
      runInAction(() => {
        this.invitations = this.invitations.filter((i) => i.id !== invitationId);
      });
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    }
  };
}
