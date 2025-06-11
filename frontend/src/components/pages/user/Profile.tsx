import { useStore } from '@/store/store';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: 'Name must be at least 3 characters' })
      .max(20, { message: 'Name must be at most 20 characters' }),
    email: z
      .string()
      .email({ message: 'Invalid email address' })
      .max(50, { message: 'Email must be at most 50 characters' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string(),
    bio: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof formSchema>;

const Profile = observer(() => {
  const { auth } = useStore();
  const [viewMode, setViewMode] = useState(true);
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: auth.user?.name || '',
      email: auth.user?.email || '',
      password: '',
      confirmPassword: '',
      bio: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
    setViewMode(true);
  };

  const handleDeleteProfile = () => {
    if (
      confirm(
        'Are you sure you want to delete your profile? This action cannot be undone.',
      )
    ) {
      console.log('Profile deleted');
    }
  };

  const name = form.watch('name');
  const email = form.watch('email');
  const bio = form.watch('bio');

  return (
    <div className="max-w-4xl mx-auto mt-10 p-10 rounded-2xl shadow-lg bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 flex flex-col md:flex-row gap-10 min-h-[520px]">
      <div className="flex flex-col items-center w-full md:w-1/3">
        <div className="w-45 h-45 rounded-full bg-gray-300 dark:bg-gray-200 overflow-hidden shadow-lg">
          <img className="object-cover w-full h-full" alt="avatar" />
        </div>
        <Button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white mt-4 px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          Edit Picture
        </Button>
        {auth.user?.role && (
          <span className="mt-7 px-4 py-1 rounded-full text-sm font-semibold bg-blue-200 text-blue-800 dark:bg-blue-600 dark:text-blue-100">
            {auth.user.role}
          </span>
        )}
      </div>
      <div className="w-full md:w-2/3">
        <h2 className="text-3xl font-bold mb-6 text-white">
          {viewMode ? 'View Profile' : 'Edit Profile'}
        </h2>
        {viewMode ? (
          <div className="space-y-6">
            <div>
              <Label className="text-sm text-gray-300 dark:text-white-700">
                Name
              </Label>
              <p className="bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 px-4 py-2 rounded-lg border border-gray-600 dark:border-gray-300">
                {name}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-300 dark:text-white-700">
                Email
              </Label>
              <p className="bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 px-4 py-2 rounded-lg border border-gray-600 dark:border-gray-300">
                {email}
              </p>
            </div>
            <div>
              <Label className="text-sm text-gray-300 dark:text-white-700">
                Bio
              </Label>
              <p className="bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 px-4 py-2 rounded-lg border border-gray-600 dark:border-gray-300 whitespace-pre-wrap break-words">
                {bio}
              </p>
            </div>
            <Button
              onClick={() => setViewMode(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              Edit Profile
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteProfile}
              className="ml-4"
            >
              Delete Profile
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300 dark:text-white-700">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Your name"
                        className="w-full bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 border border-gray-600 dark:border-gray-300 rounded-lg px-4 py-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300 dark:text-white-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Your email"
                        className="w-full bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 border border-gray-600 dark:border-gray-300 rounded-lg px-4 py-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300 dark:text-white-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="New password"
                        className="w-full bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 border border-gray-600 dark:border-gray-300 rounded-lg px-4 py-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300 dark:text-white-700">
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="Confirm new password"
                        className="w-full bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 border border-gray-600 dark:border-gray-300 rounded-lg px-4 py-2"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-sm" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-300 dark:text-white-700">
                      Bio
                    </FormLabel>
                    <FormControl>
                      <textarea
                        {...field}
                        placeholder="Your bio"
                        className="w-full bg-gray-800 text-gray-100 dark:bg-gray-100 dark:text-gray-900 border border-gray-600 dark:border-gray-300 rounded-lg px-4 py-2 whitespace-pre-wrap break-words overflow-auto"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                Save Changes
              </Button>
              <Button
                type="submit"
                onClick={() => setViewMode(true)}
                variant="destructive"
                className="ml-4"
              >
                Cancel
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
});

export default Profile;
