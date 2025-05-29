import { useStore } from '@/store/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import EmptyState from '@/components/ui/widgets/EmptyState';
import { UserIcon } from 'lucide-react';

const Invitations = observer(() => {
  const { interactionStore } = useStore();
  const { invitations, fetchInvitations, isLoading } = interactionStore;

  useEffect(() => {
    fetchInvitations();
  }, [fetchInvitations]);

  return (
    <div>
      {invitations.length === 0 && !isLoading && (
        <EmptyState
          title="No invitations"
          description="You have no invitations yet. You can send an invite to connect with other users."
          buttonText="Create Invitation"
          buttonAction={() => {}}
          buttonIcon={<UserIcon className="h-4 w-4" />}
        />
      )}
    </div>
  );
});

export default Invitations;
