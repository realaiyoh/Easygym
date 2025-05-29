import { InvitationStatus } from '@/types/Interaction';
import { Check, Clock, X } from 'lucide-react';

interface InvitationBadgeProps {
  status: InvitationStatus;
}

const InvitationBadge = ({ status }: InvitationBadgeProps) => {
  const badgeClass = {
    [InvitationStatus.Pending]:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    [InvitationStatus.Accepted]:
      'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    [InvitationStatus.Rejected]:
      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
  };

  const badgeIcon = {
    [InvitationStatus.Pending]: <Clock className="h-3 w-3" />,
    [InvitationStatus.Accepted]: <Check className="h-3 w-3" />,
    [InvitationStatus.Rejected]: <X className="h-3 w-3" />,
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badgeClass[status]}`}
    >
      {badgeIcon[status]}
      {status}
    </span>
  );
};

export default InvitationBadge;
