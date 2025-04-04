
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { loginUser } from '@/services/api';
import { toast } from '@/components/ui/use-toast';

const formSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const LoginPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: 'test@example.com', // For demo purposes
      password: 'password', // For demo purposes
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    const success = await loginUser(values.email, values.password);
    setIsSubmitting(false);
    
    if (success) {
      toast({
        title: "Success",
        description: "You've successfully logged in!",
        duration: 3000,
      });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 bg-gradient-to-b from-showapp-blue to-showapp-lightBlue flex flex-col justify-center items-center p-6">
        <div className="w-full max-w-md p-6 rounded-lg bg-white shadow-lg">
          <div className="flex flex-col items-center mb-8">
            <div className="mb-3 p-3 bg-showapp-blue bg-opacity-10 rounded-full">
              <Film size={40} className="text-showapp-blue" />
            </div>
            <h1 className="text-2xl font-bold text-center">Welcome to ShowApp</h1>
            <p className="text-sm text-gray-500 mt-2">Sign in to continue</p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        {...field} 
                        type="email"
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your password" 
                        {...field} 
                        type="password" 
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full h-12 bg-showapp-blue hover:bg-showapp-darkBlue text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
              
              <div className="text-center mt-4">
                <p className="text-sm text-gray-500">
                  Demo credentials: test@example.com / password
                </p>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

import { Film } from 'lucide-react';
export default LoginPage;
