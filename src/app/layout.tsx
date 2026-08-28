import type { Metadata, Viewport } from "next";
import { Outfit, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://nuru-portfolio.vercel.app"),
  title: "Nuru Endris | Full-Stack Web Developer",
  description: "Official Portfolio of Nuru Endris - Full Stack Web Developer specializing in React, Next.js, Node.js, Express, MySQL, MongoDB, and modern web architectures.",
  keywords: [
    "Nuru Endris",
    "Full Stack Developer",
    "Wollo University",
    "Evangadi Tech",
    "React Developer",
    "Node.js",
    "Next.js",
    "Ethiopian Developer",
    "Software Engineer"
  ],
  authors: [{ name: "Nuru Endris", url: "https://www.linkedin.com/in/nuru-endris-757645163/" }],
  creator: "Nuru Endris",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nuru-portfolio.vercel.app/",
    title: "Nuru Endris | Full-Stack Web Developer",
    description: "Full Stack Web Developer crafting high-performance, accessible, and scalable web solutions.",
    siteName: "Nuru Endris Portfolio",
    images: [
      {
        url: "/portfolio.png",
        width: 1200,
        height: 630,
        alt: "Nuru Endris Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuru Endris | Full-Stack Web Developer",
    description: "Full Stack Developer specializing in React, Next.js, Node.js, and Modern Web Systems.",
    images: ["/portfolio.png"],
  },
  icons: {
    icon: "/logo_n.png",
    apple: "/logo_n.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${plusJakarta.variable} ${outfit.variable} ${jetbrainsMono.variable} bg-[#000000] text-emerald-50 antialiased font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
