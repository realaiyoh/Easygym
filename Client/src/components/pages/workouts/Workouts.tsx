import { useStore } from '@/store/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import WorkoutCard from '@/components/pages/workouts/WorkoutCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { routes } from '@/lib/constants';
import { PlusCircleIcon } from 'lucide-react';

const Workouts = observer(() => {
  const { workout, auth } = useStore();
  const { workouts, fetchWorkouts, isLoading } = workout;
  const navigate = useNavigate();

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      fetchWorkouts(auth.user!.id);
    }

    return () => {
      ignore = true;
    };
  }, [fetchWorkouts, auth.user]);

  const handleCreateWorkout = () => {
    navigate(routes.CreateWorkout);
  };

  return (
    <div className="flex flex-col gap-2">
      {workouts.length > 0 && (
        <div className="flex flex-col gap-2">
          <Button className="self-start" onClick={handleCreateWorkout}>
            Create Workout
          </Button>
          <div className="workout-card-wrapper">
            {workouts.map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </div>
      )}
      {workouts.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center p-8 border rounded-md text-center">
          <h3 className="text-xl font-semibold mb-2">No workouts yet</h3>
          <p className="text-gray-500 mb-4">
            Create your first workout to get started with your training program.
          </p>

          <Button onClick={handleCreateWorkout}>
            <PlusCircleIcon className="h-4 w-4" />
            Create Your First Workout
          </Button>
        </div>
      )}
    </div>
  );
});

export default Workouts;
