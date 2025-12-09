import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/contexts/auth-context";
import { ThemeProvider } from "@/components/theme-provider";
import { ConditionalLayout } from "@/components/layout/conditional-layout";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agree Connect - Direct from Farm to Table",
  description: "Connect farmers directly with buyers. No middleman, maximum profit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider defaultTheme="system" storageKey="agree-connect-theme">
          <AuthProvider>
            <div className="flex min-h-screen flex-col">
              <ConditionalLayout>{children}</ConditionalLayout>
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
