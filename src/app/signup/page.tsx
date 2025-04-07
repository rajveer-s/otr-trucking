'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Truck, Home, Loader2, Eye, EyeOff } from 'lucide-react';

type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
};

export default function SignupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
  } = useForm<FormData>();

  const password = watch('password');

  const onSubmit = async (data: FormData) => {
    try {
      setIsLoading(true);

      if (data.password !== data.confirmPassword) {
        setError('confirmPassword', {
          type: 'manual',
          message: 'Passwords do not match',
        });
        return;
      }

      // Here you would typically make an API call to create the user
      console.log('Form submitted:', data);

      toast({
        title: 'Success',
        description: 'Account created successfully',
      });

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.error('Signup error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An error occurred during signup',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen relative bg-[#0a0a0a]">
      <Link
        href="/"
        className="absolute left-8 top-8 text-white hover:text-primary transition-colors z-10"
      >
        <Home className="h-8 w-8" />
      </Link>

      <div className="relative h-full flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[400px] space-y-8 relative"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="flex justify-center mb-4"
            >
              <div className="bg-[#18181b]/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-800/50">
                <Truck className="h-12 w-12 text-blue-500" />
              </div>
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
            <p className="text-gray-300 text-lg">Join our trucking platform</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#18181b]/50 backdrop-blur-sm rounded-2xl p-8 space-y-6 border border-gray-800/50 hover:border-gray-700/50 transition-all"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                {...register('name', { required: 'Name is required' })}
                placeholder="Full Name"
                className="bg-[#18181b]/50 border-gray-800/50 hover:border-gray-700/50 text-white placeholder-gray-400 h-12"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
              )}

              <Input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                placeholder="Email"
                className="bg-[#18181b]/50 border-gray-800/50 hover:border-gray-700/50 text-white placeholder-gray-400 h-12"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
              )}

              <Input
                type="password"
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                })}
                placeholder="Password"
                className="bg-[#18181b]/50 border-gray-800/50 hover:border-gray-700/50 text-white placeholder-gray-400 h-12"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
              )}

              <Input
                type="password"
                {...register('confirmPassword', {
                  required: 'Please confirm your password',
                  validate: value =>
                    value === password || 'Passwords do not match',
                })}
                placeholder="Confirm Password"
                className="bg-[#18181b]/50 border-gray-800/50 hover:border-gray-700/50 text-white placeholder-gray-400 h-12"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
              )}

              <Input
                type="tel"
                {...register('phone', {
                  required: 'Phone number is required',
                  pattern: {
                    value: /^[0-9-+() ]*$/,
                    message: 'Invalid phone number',
                  },
                })}
                placeholder="Phone Number"
                className="bg-[#18181b]/50 border-gray-800/50 hover:border-gray-700/50 text-white placeholder-gray-400 h-12"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-lg"
                disabled={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-400 hover:text-blue-300">
                  Sign in
                </Link>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
