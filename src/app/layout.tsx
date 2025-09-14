import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Base NextJS App",
  description: "A modern NextJS application with all essential features built-in",
  keywords: ["NextJS", "React", "TypeScript", "Tailwind CSS"],
  authors: [{ name: "Base NextJS Team" }],
  creator: "Base NextJS",
  publisher: "Base NextJS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Base NextJS App",
    description: "A modern NextJS application with all essential features built-in",
    url: "http://localhost:3000",
    siteName: "Base NextJS",
    locale: "en_US",
    type: "website",
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
        {children}
      </body>
    </html>
  );
}