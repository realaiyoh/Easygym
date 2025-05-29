import { useStore } from '@/store/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import WorkoutSessionListItem from '@/components/pages/workouts/WorkoutSessionListItem';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { routes } from '@/lib/constants';
import { PlayCircle, PlusCircle } from 'lucide-react';
import EmptyState from '@/components/ui/widgets/EmptyState';

const WorkoutSessions = observer(() => {
  const { workoutSession, auth } = useStore();
  const { workoutSessions, fetchWorkoutSessions, isLoading } = workoutSession;
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      fetchWorkoutSessions(auth.user!.id);
    }

    return () => {
      ignore = true;
    };
  }, [fetchWorkoutSessions, auth.user]);

  const handleCreateSession = () => {
    navigate(routes.CreateWorkoutSession);
  };

  const handleOpenSession = (sessionId: number) => {
    navigate(routes.ViewWorkoutSession(sessionId));
  };

  return (
    <div className="flex flex-col gap-2">
      {workoutSessions.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center mb-4">
            <Button onClick={handleCreateSession}>
              <PlusCircle className="h-4 w-4" />
              Start New Session
            </Button>
          </div>
          <div className="flex flex-col gap-2">
            {workoutSessions.map((session, index) => (
              <WorkoutSessionListItem
                key={session.id}
                session={session}
                addSeparator={
                  index !== workoutSessions.length - 1 ||
                  workoutSessions.length === 1
                }
                onClick={() => handleOpenSession(session.id)}
              />
            ))}
          </div>
        </div>
      )}

      {workoutSessions.length === 0 && !isLoading && (
        <EmptyState
          title="No workout sessions yet"
          description="Complete your first workout to track your progress and performance."
          buttonText="Start Your First Session"
          buttonAction={handleCreateSession}
          buttonIcon={<PlayCircle className="h-4 w-4" />}
        />
      )}
    </div>
  );
});

export default WorkoutSessions;
