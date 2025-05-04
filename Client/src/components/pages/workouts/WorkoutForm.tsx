import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import FormWrapper from '@/components/ui/widgets/FormWrapper';
import { useState } from 'react';
import { Set } from '@/types/Workout';
import { Plus, Trash } from 'lucide-react';
import { useStore } from '@/store/store';
import { routes } from '@/lib/constants';
import { useNavigate } from 'react-router';

const WorkoutForm = () => {
  const navigate = useNavigate();
  const { workout, auth } = useStore();

  const { createWorkout, error: workoutError } = workout;
  const [sets, setSets] = useState<Omit<Set, 'id'>[]>([]);

  const setFormSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    description: z.string().optional(),
    repetitions: z.coerce
      .number()
      .min(1, { message: 'Repetitions is required' }),
    weight: z.coerce.number().optional(),
  });

  const workoutFormSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    restTimeSeconds: z.coerce.number().optional(),
    sets: z.array(setFormSchema),
  });

  const workoutForm = useForm<z.infer<typeof workoutFormSchema>>({
    resolver: zodResolver(workoutFormSchema),
    defaultValues: {
      name: '',
      description: '',
      restTimeSeconds: 60,
      sets: [],
    },
  });

  const setForm = useForm<z.infer<typeof setFormSchema>>({
    resolver: zodResolver(setFormSchema),
    defaultValues: {
      name: '',
      description: '',
      repetitions: 1,
      weight: 0,
    },
  });

  const addSet = (data: z.infer<typeof setFormSchema>) => {
    setSets([...sets, data]);
    setForm.reset();
    toast.success('Set added');
  };

  const removeSet = (index: number) => {
    const newSets = [...sets];
    newSets.splice(index, 1);
    setSets(newSets);
  };

  const onSubmit = async (data: z.infer<typeof workoutFormSchema>) => {
    if (sets.length === 0) {
      toast.error('You must add at least one set');
      return;
    }

    const workoutData = {
      ...data,
      sets,
      traineeId: auth.user!.id,
    };

    await createWorkout(workoutData);

    if (workoutError) {
      toast.error(workoutError);
      return;
    }

    toast.success('Workout created successfully');
    navigate(routes.Workouts);
  };

  const handleAddSet = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setForm.handleSubmit(addSet)();
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Create Workout</h2>
        <Form {...workoutForm}>
          <FormWrapper
            className="w-full"
            onSubmit={workoutForm.handleSubmit(onSubmit)}
          >
            <FormField
              control={workoutForm.control}
              name="name"
              render={({ field }) => (
                <FormItem fullWidth>
                  <FormLabel>Workout Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter workout name..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={workoutForm.control}
              name="description"
              render={({ field }) => (
                <FormItem fullWidth>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your workout..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={workoutForm.control}
              name="restTimeSeconds"
              render={({ field }) => (
                <FormItem fullWidth>
                  <FormLabel>Rest Time (seconds)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-8">
              <h3 className="text-xl font-bold">Sets</h3>

              {sets.length > 0 && (
                <div className="space-y-4 mb-6">
                  {sets.map((set, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-4 border rounded-md"
                    >
                      <div className="flex-1">
                        <p>
                          <strong>{set.name || `Set ${index + 1}`}</strong>
                        </p>
                        {set.description && (
                          <p className="text-sm text-gray-500">
                            {set.description}
                          </p>
                        )}
                        <p>Reps: {set.repetitions}</p>
                        {set.weight && <p>Weight: {set.weight}kg</p>}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSet(index)}
                        type="button"
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={setForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Set Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Warm-up, Main set..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={setForm.control}
                name="repetitions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repetitions</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={setForm.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg, optional)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={setForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Any notes about this set..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button onClick={handleAddSet} variant="outline" className="mt-2">
              <Plus className="h-4 w-4 mr-2" /> Add Set
            </Button>

            <Button type="submit" className="mt-6">
              Create Workout
            </Button>
          </FormWrapper>
        </Form>
      </div>
    </div>
  );
};

export default WorkoutForm;
