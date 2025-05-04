import { Workout } from '@/types/Workout';
import { formatDistance } from 'date-fns';
import { Dumbbell, Calendar, Info, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WorkoutCardProps {
  workout: Workout;
}

const WorkoutCard = ({ workout }: WorkoutCardProps) => {
  const formattedDate = workout.createdAt
    ? formatDistance(new Date(workout.createdAt), new Date(), {
        addSuffix: true,
      })
    : 'Unknown date';

  return (
    <div className="bg-card rounded-lg shadow-sm border border-border p-4 mb-4 hover:shadow-md transition-all">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold">
            {workout.name || 'Unnamed Workout'}
          </h3>
          <div className="flex items-center text-muted-foreground mt-1 text-sm">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formattedDate}</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" aria-label="More details">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {workout.description && (
        <div className="mt-3 flex items-start">
          <Info className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">{workout.description}</p>
        </div>
      )}

      <div className="mt-4 border-t border-border pt-3">
        <div className="flex items-center text-sm">
          <Dumbbell className="h-4 w-4 mr-2 text-primary" />
          <span>{workout.sets?.length || 0} exercises</span>
        </div>

        {workout.sets && workout.sets.length > 0 && (
          <div className="mt-2 space-y-2">
            {workout.sets.slice(0, 2).map((set) => (
              <div
                key={set.id}
                className="flex items-center justify-between bg-background rounded p-2 text-sm"
              >
                <span>{set.name || `Set ${set.id}`}</span>
                <span className="text-muted-foreground">
                  {set.repetitions} reps {set.weight ? `• ${set.weight}kg` : ''}
                </span>
              </div>
            ))}
            {workout.sets.length > 2 && (
              <div className="text-xs text-center text-muted-foreground mt-1">
                +{workout.sets.length - 2} more sets
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
