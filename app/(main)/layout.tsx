import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../styles/global.css";
import Nav from "@/components/common/Nav";
import Footer from "@/components/common/Footer";
import Providers from "../provider";
import { ToastContainer } from "react-toastify";
import { NotesSyncer } from "@/components/match-notes/NotesSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Match Note Maker",
  description: "Your Match Note Maker to trace your match prediction history",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <NotesSyncer/>
          <ToastContainer position="top-right" />
          <Nav />
          {children}
          <Footer/>
      </body>
    </html>
  );
}
