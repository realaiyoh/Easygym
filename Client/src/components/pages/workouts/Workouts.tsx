import { useStore } from '@/store/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import WorkoutCard from '@/components/pages/workouts/WorkoutCard';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { routes } from '@/lib/constants';

const Workouts = observer(() => {
  const { workout, auth } = useStore();
  const { workouts, fetchWorkouts } = workout;
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.user) {
      fetchWorkouts(auth.user.id);
    }
  }, [fetchWorkouts, auth.user]);

  const handleCreateWorkout = () => {
    navigate(routes.CreateWorkout);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex">
        <Button onClick={handleCreateWorkout}>Create Workout</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
});

export default Workouts;
