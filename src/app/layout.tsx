import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Toaster from "@/components/ui/sonner";

const FigtreeFont = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "/logo.svg",
  },
  title: "Follow Email | Waitlist",
  description:
    "Deliver smarter emails with AI precision",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={FigtreeFont.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
