import { useStore } from '@/store/store';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import WorkoutCard from '@/components/pages/workouts/WorkoutCard';

const Workouts = observer(() => {
  const { workout, auth } = useStore();
  const { workouts, fetchWorkouts } = workout;

  useEffect(() => {
    if (auth.user) {
      fetchWorkouts(auth.user.id);
    }
  }, [fetchWorkouts, auth.user]);

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workouts.map((workout) => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
});

export default Workouts;
