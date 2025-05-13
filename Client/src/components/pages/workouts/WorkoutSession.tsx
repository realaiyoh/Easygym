import { useStore } from '@/store/store';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { routes } from '@/lib/constants';
import { observer } from 'mobx-react-lite';
import { Workout } from '@/types/Workout';
import { Progress } from '@/components/ui/progress';
import {
  ArrowRight,
  CheckCircle,
  DumbbellIcon,
  RepeatIcon,
} from 'lucide-react';
import WorkoutCard from './WorkoutCard';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  Form,
  FormMessage,
} from '@/components/ui/form';
import FormWrapper from '@/components/ui/widgets/FormWrapper';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const WorkoutSession = observer(() => {
  const { workoutSession, workout, auth } = useStore();
  const { createWorkoutSession } = workoutSession;
  const { workouts, fetchWorkouts } = workout;
  const navigate = useNavigate();

  const [sessionStarted, setSessionStarted] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showingRest, setShowingRest] = useState(false);
  const [restTimeRemaining, setRestTimeRemaining] = useState(0);
  const [restTimeInterval, setRestTimeInterval] =
    useState<NodeJS.Timeout | null>(null);

  const WorkoutSessionFormSchema = z.object({
    perceivedDifficulty: z.coerce
      .number()
      .min(1, { message: 'Perceived difficulty must be at least 1' })
      .max(10, { message: 'Perceived difficulty must be at most 10' })
      .optional(),
    notes: z.string().optional(),
  });

  const workoutSessionForm = useForm<z.infer<typeof WorkoutSessionFormSchema>>({
    resolver: zodResolver(WorkoutSessionFormSchema),
    defaultValues: {
      perceivedDifficulty: 1,
      notes: '',
    },
  });

  useEffect(() => {
    if (!workouts.length) fetchWorkouts(auth.userId);
  }, [fetchWorkouts, auth.userId, workouts.length]);

  const handleStartSession = () => {
    if (!selectedWorkout) return;

    setSessionStarted(true);
    setSessionStartTime(new Date());

    toast.success(
      `Started workout: ${selectedWorkout.name || 'Unnamed Workout'}`,
    );
  };

  const clearRestTimeInterval = () => {
    if (restTimeInterval) {
      clearInterval(restTimeInterval);
      setRestTimeInterval(null);
    }
  };

  const handleNext = () => {
    clearRestTimeInterval();

    if (!selectedWorkout) return;

    // If showing rest, move to the next exercise
    if (showingRest) {
      setShowingRest(false);
      setCurrentExerciseIndex((prev) => prev + 1);
      return;
    }

    // If not the last exercise, show rest period
    if (currentExerciseIndex < selectedWorkout.sets.length - 1) {
      setShowingRest(true);
      setRestTimeRemaining(selectedWorkout.restTimeSeconds);

      const restInterval = setInterval(() => {
        setRestTimeRemaining((prev) => {
          if (prev <= 1) {
            clearRestTimeInterval();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setRestTimeInterval(restInterval);
    }
  };

  const handleEndSession = () => {
    if (!selectedWorkout || !sessionStartTime) return;

    createWorkoutSession({
      workoutId: selectedWorkout.id,
      traineeId: auth.userId,
      startTime: sessionStartTime.toISOString(),
      endTime: new Date().toISOString(),
      notes: workoutSessionForm.getValues('notes'),
      perceivedDifficulty: workoutSessionForm.getValues('perceivedDifficulty'),
    });

    toast.success('Workout session completed!');
    navigate(routes.WorkoutSessions);
  };

  const currentProgress = useMemo(() => {
    if (!selectedWorkout) return 0;

    const totalSteps = selectedWorkout.sets.length * 2 - 1;
    const completedSteps = currentExerciseIndex * 2 + +showingRest;
    return (completedSteps / totalSteps) * 100;
  }, [selectedWorkout, currentExerciseIndex, showingRest]);

  const currentExercise = useMemo(() => {
    if (!selectedWorkout) return null;
    return selectedWorkout.sets[currentExerciseIndex];
  }, [selectedWorkout, currentExerciseIndex]);

  const isLastExercise = useMemo(() => {
    return (
      selectedWorkout &&
      currentExerciseIndex === selectedWorkout.sets.length - 1 &&
      !showingRest
    );
  }, [selectedWorkout, currentExerciseIndex, showingRest]);

  const handleEndWorkout = () => {
    workoutSessionForm.handleSubmit(handleEndSession)();
  };

  return (
    <>
      {!sessionStarted && (
        <div className="workout-card-wrapper">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              viewOnly
              compact
              workout={workout}
              selected={selectedWorkout?.id === workout.id}
              onSelect={() => setSelectedWorkout(workout)}
            />
          ))}
        </div>
      )}

      {selectedWorkout?.id && !sessionStarted && (
        <div className="fixed bottom-8 right-8 bg-background">
          <Button onClick={handleStartSession}>Start Workout</Button>
        </div>
      )}

      {sessionStarted && (
        <div className="flex flex-col gap-4">
          <Progress value={currentProgress} className="w-full" />

          <div className="text-sm text-muted-foreground">
            Exercise {currentExerciseIndex + 1} of{' '}
            {selectedWorkout?.sets?.length || 0}
          </div>

          <div className="bg-card rounded-lg shadow-sm border border-border p-4">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">
                {showingRest
                  ? 'Rest Time'
                  : currentExercise?.name || 'Exercise'}
              </h3>
            </div>
            <div className="mb-4">
              {showingRest ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="text-4xl font-bold mb-4">
                    {Math.floor(restTimeRemaining / 60)}:
                    {(restTimeRemaining % 60).toString().padStart(2, '0')}
                  </div>
                  <p>Take a moment to rest before the next exercise.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2 items-center">
                    <RepeatIcon className="h-4 w-4" />
                    <span className="font-medium">Repetitions: </span>
                    <span>{currentExercise?.repetitions || 0}</span>
                  </div>

                  <div className="flex gap-2 items-center">
                    <DumbbellIcon className="h-4 w-4" />
                    <span className="font-medium">Weight: </span>
                    <span>
                      {currentExercise?.weight && currentExercise?.weight > 0
                        ? `${currentExercise.weight} kg`
                        : 'No added weight'}
                    </span>
                  </div>

                  {currentExercise?.description && (
                    <div className="text-sm text-muted-foreground">
                      {currentExercise.description}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex justify-between border-t border-border pt-4">
              {!isLastExercise ? (
                <Button onClick={handleNext} className="ml-auto">
                  {showingRest ? 'Skip Rest' : 'Next'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleEndWorkout}
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
            <Form {...workoutSessionForm}>
              <FormWrapper>
                <FormField
                  control={workoutSessionForm.control}
                  name="perceivedDifficulty"
                  render={({ field }) => (
                    <FormItem fullWidth>
                      <FormLabel>Perceived difficulty</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} max={10} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={workoutSessionForm.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem fullWidth>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter notes about this workout session..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </FormWrapper>
            </Form>
          )}
        </div>
      )}
    </>
  );
});

export default WorkoutSession;
