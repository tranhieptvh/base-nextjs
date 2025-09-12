import type { Metadata } from "next";
import "./globals.css";
import { MainLayout } from "@/components/layout/main-layout";
import { ThemeProvider } from "@/components/theme-provider";

export const metadata: Metadata = {
  title: "Base NextJS App",
  description: "A modern NextJS application with all essential features built-in",
  keywords: ["NextJS", "React", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Base NextJS Team" }],
  creator: "Base NextJS Team",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://base-nextjs.app",
    title: "Base NextJS App",
    description: "A modern NextJS application with all essential features built-in",
    siteName: "Base NextJS App",
  },
  twitter: {
    card: "summary_large_image",
    title: "Base NextJS App",
    description: "A modern NextJS application with all essential features built-in",
    creator: "@basenextjs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MainLayout>{children}</MainLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
