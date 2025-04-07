import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - OTR Trucking App',
  description: 'Sign in to your OTR Trucking account',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950 p-4">
      {children}
    </div>
  );
}
