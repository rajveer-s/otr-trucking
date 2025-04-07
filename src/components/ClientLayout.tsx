'use client';

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppTemplateWrapper } from "@/components/AppTemplateWrapper";

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <AppTemplateWrapper>{children}</AppTemplateWrapper>
        <Toaster />
      </AuthProvider>
    </ThemeProvider>
  );
}
