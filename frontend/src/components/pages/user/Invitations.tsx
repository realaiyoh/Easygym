import { useStore } from '@/store/store';
import { observer } from 'mobx-react-lite';
import { useEffect, useMemo, useState } from 'react';
import EmptyState from '@/components/ui/widgets/EmptyState';
import { UserIcon } from 'lucide-react';
import { UserRole } from '@/types/User';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormWrapper from '@/components/ui/widgets/FormWrapper';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { titleize } from '@/lib/utils';
import InvitationsListItem from '@/components/pages/user/InvitationsListItem';

const Invitations = observer(() => {
  const { interactionStore, auth } = useStore();
  const { invitations, fetchInvitations, isLoading } = interactionStore;

  const invitee = useMemo(() => {
    return auth.isUserClient ? UserRole.Trainer : UserRole.Client;
  }, [auth.isUserClient]);

  const emptyStateButtonText = useMemo(() => {
    return `Send an invite to a ${invitee}`;
  }, [invitee]);

  const emptyStateDescriptionText = useMemo(() => {
    return `You have no invitations yet. You can send an invite to start working with a ${invitee}.`;
  }, [invitee]);

  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  const InviteFormSchema = z.object({
    email: z.string().email({ message: 'Invalid email address.' }),
    message: z.string().optional(),
  });

  const inviteForm = useForm<z.infer<typeof InviteFormSchema>>({
    resolver: zodResolver(InviteFormSchema),
    defaultValues: {
      email: '',
      message: '',
    },
  });

  const handleOpenInviteModal = () => {
    setIsInviteModalOpen(true);
  };

  const onInviteFormSubmit = async (data: z.infer<typeof InviteFormSchema>) => {
    await interactionStore.createInvitation({
      [`${invitee}Email`]: data.email,
      message: (data.message ?? '').trim(),
    });

    if (interactionStore.error) {
      toast.error(interactionStore.error);
      return;
    }

    toast.success(`${titleize(invitee)} invited successfully`);

    setIsInviteModalOpen(false);
  };

  const handleInviteModalOpenChange = (open: boolean) => {
    if (!open) {
      setIsInviteModalOpen(false);
    }

    inviteForm.reset();
  };

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  return (
    <div>
      <Dialog
        open={isInviteModalOpen}
        onOpenChange={handleInviteModalOpenChange}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Send invite</DialogTitle>
            <DialogDescription>
              Enter the email of the {invitee} you want to invite. You can track
              the status of the invitation in the invitations list.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Form {...inviteForm}>
              <FormWrapper
                onSubmit={inviteForm.handleSubmit(onInviteFormSubmit)}
              >
                <FormField
                  control={inviteForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem fullWidth>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={inviteForm.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem fullWidth>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          className="text-sm"
                          placeholder="Message..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Invite</Button>
              </FormWrapper>
            </Form>
          </div>
        </DialogContent>
      </Dialog>

      {invitations.length === 0 && !isLoading && (
        <EmptyState
          title="No invitations"
          description={emptyStateDescriptionText}
          buttonText={emptyStateButtonText}
          buttonAction={handleOpenInviteModal}
          buttonIcon={<UserIcon className="h-4 w-4" />}
        />
      )}

      {invitations.length > 0 && !isLoading && (
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            You have {invitations.length} invitations.
          </p>
          <Button className="self-start" onClick={handleOpenInviteModal}>
            Send invite
          </Button>
          {invitations.map((invitation) => (
            <InvitationsListItem key={invitation.id} invitation={invitation} />
          ))}
        </div>
      )}
    </div>
  );
});

export default Invitations;
