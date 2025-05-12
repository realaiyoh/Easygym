import { useStore } from '@/store/store';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { routes } from '@/lib/constants';
import { observer } from 'mobx-react-lite';
import { Set, Workout } from '@/types/Workout';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, CheckCircle } from 'lucide-react';
import WorkoutCard from './WorkoutCard';

const WorkoutSession = observer(() => {
  const { workoutSession, workout, auth } = useStore();
  const { fetchWorkoutSessions, createWorkoutSession } = workoutSession;
  const { workouts, fetchWorkouts } = workout;
  const params = useParams();
  const navigate = useNavigate();

  // Workout session states
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showingRest, setShowingRest] = useState(false);
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [notes, setNotes] = useState('');

  // Load available workouts
  useEffect(() => {
    fetchWorkouts(auth.user!.id);
    fetchWorkoutSessions(auth.user!.id);
  }, [fetchWorkouts, fetchWorkoutSessions, auth.user]);

  // If there's a workout ID in params, select it automatically
  useEffect(() => {
    const workoutId = params.workoutId ? parseInt(params.workoutId) : null;
    if (workoutId && workouts.length > 0) {
      const foundWorkout = workouts.find((w) => w.id === workoutId);
      if (foundWorkout) {
        setSelectedWorkout(foundWorkout);
      }
    }
  }, [params.workoutId, workouts]);

  // Start workout session
  const handleStartSession = () => {
    if (!selectedWorkout) return;
    setSessionStarted(true);
    setSessionStartTime(new Date());
    setCurrentExerciseIndex(0);
    setShowingRest(false);
    toast.success(
      `Started workout: ${selectedWorkout.name || 'Unnamed Workout'}`,
    );
  };

  // Handle next exercise or rest period
  const handleNext = () => {
    if (!selectedWorkout || !selectedWorkout.sets) return;

    if (showingRest) {
      // Move to the next exercise after rest
      setShowingRest(false);
      setCurrentExerciseIndex((prev) => prev + 1);
    } else {
      // If not the last exercise, show rest period
      if (currentExerciseIndex < selectedWorkout.sets.length - 1) {
        setShowingRest(true);
        setRestTimeRemaining(selectedWorkout.restTimeSeconds);

        // Setup countdown for rest period
        const interval = setInterval(() => {
          setRestTimeRemaining((prev) => {
            if (prev <= 1) {
              clearInterval(interval);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        // Cleanup interval
        return () => clearInterval(interval);
      }
    }
  };

  // End workout session
  const handleEndSession = () => {
    if (!selectedWorkout || !sessionStartTime) return;

    const endTime = new Date();

    // Create workout session
    createWorkoutSession({
      workoutId: selectedWorkout.id,
      traineeId: auth.user!.id,
      startTime: sessionStartTime.toISOString(),
      endTime: endTime.toISOString(),
      notes: notes,
    });

    toast.success('Workout session completed!');
    navigate(routes.WorkoutSessions);
  };

  // Calculate progress percentage
  const calculateProgress = () => {
    if (!selectedWorkout?.sets) return 0;
    const totalSteps = selectedWorkout.sets.length * 2 - 1; // Exercises + Rest periods
    const completedSteps = currentExerciseIndex * 2 + (showingRest ? 1 : 0);
    return (completedSteps / totalSteps) * 100;
  };

  // Get current exercise
  const getCurrentExercise = (): Set | null => {
    if (
      !selectedWorkout?.sets ||
      currentExerciseIndex >= selectedWorkout.sets.length
    ) {
      return null;
    }
    return selectedWorkout.sets[currentExerciseIndex];
  };

  // Select workout screen
  if (!sessionStarted) {
    return (
      <div className="flex flex-col gap-4">
        {workouts.map((workout) => (
          <WorkoutCard
            key={workout.id}
            viewOnly
            compact
            workout={workout}
            onSelect={() => setSelectedWorkout(workout)}
          />
        ))}
      </div>
    );
  }

  // Active workout session
  const currentExercise = getCurrentExercise();
  const isLastExercise =
    selectedWorkout?.sets &&
    currentExerciseIndex === selectedWorkout.sets.length - 1 &&
    !showingRest;

  return (
    <div className="flex flex-col gap-4">
      <Progress value={calculateProgress()} className="w-full" />

      <div className="text-sm text-muted-foreground">
        Exercise {currentExerciseIndex + 1} of{' '}
        {selectedWorkout?.sets?.length || 0}
      </div>

      <div className="bg-card rounded-lg shadow-sm border border-border p-4">
        <div className="mb-4">
          <h3 className="text-xl font-semibold">
            {showingRest ? 'Rest Time' : currentExercise?.name || 'Exercise'}
          </h3>
        </div>
        <div className="mb-4">
          {showingRest ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="text-4xl font-bold mb-4">
                {Math.floor(restTimeRemaining / 60)}:
                {(restTimeRemaining % 60).toString().padStart(2, '0')}
              </div>
              <p>Take a moment to rest before the next exercise</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">Repetitions:</span>
                <span>{currentExercise?.repetitions || 0}</span>
              </div>

              {currentExercise?.weight && (
                <div className="flex justify-between items-center">
                  <span className="font-medium">Weight:</span>
                  <span>{currentExercise.weight} kg</span>
                </div>
              )}

              {currentExercise?.description && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {currentExercise.description}
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex justify-between border-t border-border pt-4">
          {!isLastExercise && (
            <Button onClick={handleNext} className="ml-auto">
              {showingRest ? 'Skip Rest' : 'Completed'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}

          {isLastExercise && (
            <Button
              onClick={handleEndSession}
              className="ml-auto"
              variant="default"
            >
              End Workout
              <CheckCircle className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {isLastExercise && (
        <div className="mt-4">
          <textarea
            className="w-full p-2 border rounded-md min-h-[100px]"
            placeholder="Add notes about this workout session..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
      )}
    </div>
  );
});

export default WorkoutSession;
