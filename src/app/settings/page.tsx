'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { user, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Redirect to login if no user
  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-2xl font-semibold text-white mb-8">Settings</h1>

        <div className="grid gap-6">
          {/* Account Settings */}
          <div className="relative bg-[#18181b]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-medium text-white">Account</h2>
                <p className="text-sm text-gray-400">
                  Manage your account settings
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-400">Name</Label>
                  <p className="text-sm text-white mt-1">{user.name}</p>
                </div>
                <div>
                  <Label className="text-gray-400">Email</Label>
                  <p className="text-sm text-white mt-1">{user.email}</p>
                </div>
                <div>
                  <Label className="text-gray-400">Role</Label>
                  <p className="text-sm text-white mt-1 capitalize">{user.role}</p>
                </div>
                <div>
                  <Label className="text-gray-400">Phone</Label>
                  <p className="text-sm text-white mt-1">{user.phone}</p>
                </div>
                {user.licenseNumber && (
                  <div>
                    <Label className="text-gray-400">License Number</Label>
                    <p className="text-sm text-white mt-1">{user.licenseNumber}</p>
                  </div>
                )}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {/* Add password change functionality */}}
                    className="bg-[#18181b]/30 border-gray-800/50 hover:bg-[#18181b]/50 hover:border-gray-700/50 text-white"
                  >
                    Change Password
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={logout}
                    className="bg-red-600/20 border-red-800/50 hover:bg-red-600/30 hover:border-red-700/50 text-red-400"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="relative bg-[#18181b]/50 backdrop-blur-sm rounded-lg overflow-hidden border border-gray-800/50">
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-lg font-medium text-white">Notifications</h2>
                <p className="text-sm text-gray-400">
                  Configure your notification preferences
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-400">Email Notifications</Label>
                    <p className="text-sm text-gray-400">
                      Receive email notifications for important updates
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {/* Add notification toggle */}}
                    className="bg-[#18181b]/30 border-gray-800/50 hover:bg-[#18181b]/50 hover:border-gray-700/50 text-white"
                  >
                    Enable
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-400">Load Updates</Label>
                    <p className="text-sm text-gray-400">
                      Get notified about load status changes
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => {/* Add notification toggle */}}
                    className="bg-[#18181b]/30 border-gray-800/50 hover:bg-[#18181b]/50 hover:border-gray-700/50 text-white"
                  >
                    Enable
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
