import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/contexts/AuthContext";
import { AppTemplateWrapper } from "@/components/AppTemplateWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OTR Trucking App",
  description: "Manage your trucking operations efficiently",
};

export default function NewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-[#0A0A0A] text-white antialiased`}>
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <AppTemplateWrapper>{children}</AppTemplateWrapper>
            <Toaster theme="dark" />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
