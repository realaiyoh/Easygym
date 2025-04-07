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
import FormWrapper from '@/components/ui/widgets/FormWrapper';
import { UserRole } from '@/types/User';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { titleize } from '@/lib/utils';
import { useStore } from '@/store/store';
import { observer } from 'mobx-react-lite';

const Register = observer(() => {
  const { auth } = useStore();

  const FormSchema = z.object({
    name: z.string(),
    email: z.string().email({
      message: 'Invalid email address.',
    }),
    password: z.string().min(8, {
      message: 'Password must be at least 8 characters.',
    }),
    role: z.enum(Object.values(UserRole) as [UserRole, ...UserRole[]]),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: UserRole.Client,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const user = await auth.register(data);

    if (user) {
      toast.success('Registered successfully');
    } else {
      toast.error('Failed to register');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen-content">
      <Form {...form}>
        <FormWrapper className="w-1/3" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem fullWidth>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem fullWidth>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem fullWidth>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem fullWidth>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  {...field}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {Object.values(UserRole).map((role) => (
                        <SelectItem key={role} value={role}>
                          {titleize(role)}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </FormWrapper>
      </Form>
    </div>
  );
});

export default Register;
