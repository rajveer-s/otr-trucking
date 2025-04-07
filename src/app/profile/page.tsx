'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Mail, Phone, Calendar, Truck, BadgeCheck } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto space-y-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-4">Profile</h1>
          <p className="text-gray-400">Manage your account information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Photo Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <Card className="bg-[#18181b]/80 backdrop-blur-xl border-gray-800/50">
              <CardContent className="p-6">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-4 border-gray-800/50">
                    <img
                      src={user.avatar || '/default-avatar.png'}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                    <p className="text-gray-400">{user.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* User Information Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2"
          >
            <Card className="bg-[#18181b]/80 backdrop-blur-xl border-gray-800/50">
              <CardHeader>
                <CardTitle className="text-xl text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Mail className="h-5 w-5" />
                      <span>Email</span>
                    </div>
                    <p className="text-white">{user.email}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Phone className="h-5 w-5" />
                      <span>Phone</span>
                    </div>
                    <p className="text-white">{user.phone || 'Not provided'}</p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Calendar className="h-5 w-5" />
                      <span>Member Since</span>
                    </div>
                    <p className="text-white">{formatDate(user.createdAt)}</p>
                  </div>
                  {user.licenseNumber && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Truck className="h-5 w-5" />
                        <span>License Number</span>
                      </div>
                      <p className="text-white">{user.licenseNumber}</p>
                    </div>
                  )}
                </div>

                {user.experience && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <BadgeCheck className="h-5 w-5" />
                      <span>Experience</span>
                    </div>
                    <p className="text-white">{user.experience} years</p>
                  </div>
                )}

                {user.preferredRoutes && (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Truck className="h-5 w-5" />
                      <span>Preferred Routes</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {user.preferredRoutes.map((route, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-gray-800/50 rounded-full text-sm text-white"
                        >
                          {route}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
