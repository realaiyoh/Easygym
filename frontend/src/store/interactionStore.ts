import interactionService from '@/api/services/interactionService';
import { getErrorMessage } from '@/lib/utils';
import { CreateInvitationRequest, Invitation, InvitationStatus } from '@/types/Interaction';
import { makeAutoObservable, runInAction } from 'mobx';

export default class InteractionStore {
  _invitations: Invitation[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get invitations() {
    return [...this._invitations].sort((a, b) => {
      if (a.status === InvitationStatus.Rejected) return 1;
      if (b.status === InvitationStatus.Rejected) return -1;
      if (a.status === InvitationStatus.Accepted) return 1;
      if (b.status === InvitationStatus.Accepted) return -1;
      return 0;
    });
  }

  get nonResolvedInvitations() {
    return this.invitations.filter((i) => i.status === InvitationStatus.Pending);
  }

  fetchInvitations = async () => {
    runInAction(() => {
      this.isLoading = true;
      this.error = null;
    });

    try {
      const _invitations = await interactionService.getInvitations();
      runInAction(() => {
        this._invitations = _invitations;
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
        this._invitations.push(newInvitation);
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
        this._invitations = this._invitations.map((i) => {
          if (i.id !== invitationId) return i;

          return {
            ...i,
            status: updatedInvitation.status,
            resolvedAt: updatedInvitation.resolvedAt,
          }
        });
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
        this._invitations = this._invitations.filter((i) => i.id !== invitationId);
      });
    } catch (error) {
      runInAction(() => {
        this.error = getErrorMessage(error);
      });
    }
  };
}
