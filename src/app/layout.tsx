import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScollToTop";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Movie Monday - Discover Movies & TV Shows",
  description: "Your ultimate destination for discovering movies, TV shows, and actors. Browse through upcoming releases, top-rated content, and popular shows.",
  keywords: ["movies", "TV shows", "actors", "entertainment", "streaming"],
  authors: [{ name: "Movie Monday Team" }],
  openGraph: {
    title: "Movie Monday - Discover Movies & TV Shows",
    description: "Your ultimate destination for discovering movies, TV shows, and actors.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Movie Monday - Discover Movies & TV Shows",
    description: "Your ultimate destination for discovering movies, TV shows, and actors.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ScrollToTop />
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">
            {children}
          </main>
          <footer className="bg-background border-t">
            <div className="container mx-auto px-4 py-6">
              <p className="text-center text-muted-foreground">
                © {new Date().getFullYear()} Movie Monday. All rights reserved.
              </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
