import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { Toaster } from 'react-hot-toast';
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PayNest",
  description: "This is website for money transactions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <SessionWrapper>


      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        {children}
        <Footer/>
        <Toaster position="top-center" />
      </body>
        </SessionWrapper>
    </html>
  );
}
