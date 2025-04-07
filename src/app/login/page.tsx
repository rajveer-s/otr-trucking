'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Truck } from 'lucide-react';
import { mockUsers } from '@/lib/data/mockData';
import { BackgroundSlider } from '@/components/ui/background-slider';

type FormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);
      console.log('Form submitted:', data);

      const user = mockUsers.find(
        (u) => u.email === data.email && u.password === data.password
      );

      if (!user) {
        const emailExists = mockUsers.some((u) => u.email === data.email);

        if (emailExists) {
          setError('password', {
            type: 'manual',
            message: 'Incorrect password',
          });
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Incorrect password',
          });
        } else {
          setError('email', {
            type: 'manual',
            message: 'User not found',
          });
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'User not found',
          });
        }
        return;
      }

      await login(data.email, data.password);
      window.location.href = '/';
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred during login',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BackgroundSlider />
      <div className="flex min-h-screen items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px] space-y-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="flex justify-center mb-4"
            >
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4">
                <Truck className="h-12 w-12 text-blue-500" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-gray-300 text-lg">Sign in to your account</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 space-y-6"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  placeholder="Email"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 h-12"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  placeholder="Password"
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 h-12"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-400">
                Don't have an account?{' '}
                <Link href="/signup" className="text-blue-400 hover:text-blue-300">
                  Sign up
                </Link>
              </p>
            </div>
          </motion.div>

          <div className="text-center text-sm text-gray-400">
            <p>Demo Credentials:</p>
            <p>Admin: admin@otr.com / password123</p>
            <p>Driver: driver@otr.com / password123</p>
          </div>
        </motion.div>
      </div>
    </>
  );
}
