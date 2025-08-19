import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatConfigProvider } from "@/store/chat-config";
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RAG Chat Application",
  description: "A modern, LLM-powered Retrieval Augmented Generation (RAG) system for seamless support chat experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-800 text-gray-100 font-sans`}
      >
        <ChatConfigProvider>
          {children}
        </ChatConfigProvider>
      </body>
      <GoogleAnalytics gaId="G-GP46SFF7M7" />
    </html>
  );
}
