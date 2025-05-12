import { WorkoutSession } from '@/types/WorkoutSession';
import { format } from 'date-fns';
import { CalendarClock, Clock, BarChart } from 'lucide-react';

interface WorkoutSessionCardProps {
  session: WorkoutSession;
  addSeparator?: boolean;
}

const WorkoutSessionCard = ({
  session,
  addSeparator,
}: WorkoutSessionCardProps) => {
  const startTime = new Date(session.startTime);
  const endTime = new Date(session.endTime);
  const duration = endTime.getTime() - startTime.getTime();
  const durationMinutes = Math.round(duration / (1000 * 60));

  // Format date and time
  const formattedDate = format(startTime, 'PPP');
  const formattedStartTime = format(startTime, 'p');
  const formattedEndTime = format(endTime, 'p');

  const difficultyLevel = session.perceivedDifficulty
    ? `${session.perceivedDifficulty}/10`
    : 'Not rated';

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center rounded-lg p-2 hover:bg-card transition-all cursor-pointer">
        <h3 className="font-semibold">
          {session.workout?.name || 'Workout Session'}
        </h3>
        <div className="flex gap-1 items-center text-muted-foreground mt-1 text-sm">
          <CalendarClock className="h-4 w-4" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex gap-1 items-center text-muted-foreground mt-1 text-sm">
          <Clock className="h-4 w-4" />
          <span>
            {formattedStartTime} - {formattedEndTime} ({durationMinutes} mins)
          </span>
        </div>

        <div className="flex gap-1 items-center">
          <BarChart className="h-4 w-4" />
          <span>Difficulty: {difficultyLevel}</span>
        </div>
      </div>
      {addSeparator && <div className="w-full h-0.5 bg-muted" />}
    </div>
  );
};

export default WorkoutSessionCard;
