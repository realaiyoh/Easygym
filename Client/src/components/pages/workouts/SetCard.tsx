import { Set } from '@/types/Workout';
import { Button } from '@/components/ui/button';
import {
  Clipboard,
  Dumbbell,
  XCircleIcon,
} from 'lucide-react';

interface SetCardProps {
  set: Omit<Set, 'id'>;
  index: number;
  setDisplaySetDetails: (set: Omit<Set, 'id'>) => void;
  duplicateSet: (
    set: Omit<Set, 'id'>,
    index: number,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void;
  removeSet: (index: number, e: React.MouseEvent<HTMLButtonElement>) => void;
}

const SetCard = ({
  set,
  index,
  setDisplaySetDetails,
  removeSet,
  duplicateSet,
}: SetCardProps) => {

  return (
    <div
      className="flex gap-4 justify-between p-4 border rounded-md w-[200px] hover:bg-card cursor-pointer"
      onClick={() => setDisplaySetDetails(set)}
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex gap-4 w-full justify-between">
          <span className="font-bold mt-1">
            {set.name || `Set ${index + 1}`}
          </span>

          <div className="flex gap-2 cursor-pointer">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => duplicateSet(set, index, e)}
            >
              <Clipboard className="h-4 w-4 shrink-0 " />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => removeSet(index, e)}
            >
              <XCircleIcon className="h-4 w-4 shrink-0" />
            </Button>
          </div>
        </div>

        {set.description && (
          <div className="truncate">
            <span className="text-sm truncate text-gray-500">
              {set.description}
            </span>
          </div>
        )}
        <div className="flex gap-2 justify-between">
          <p>{set.repetitions} Reps</p>
          {!!set.weight && set.weight > 0 && (
            <div className="flex gap-1 items-center">
              <Dumbbell className="h-4 w-4" />
              <span>{set.weight}kg</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SetCard;
