import "@/styles/globals.css";

import { type Metadata } from "next";
import { Inter } from "next/font/google";
import "react-toastify/ReactToastify.css";
import { Slide, ToastContainer } from "react-toastify/unstyled";

export const metadata: Metadata = {
  title: "Collabrix",
  description:
    "Collabrix is a browser-based design platform enabling real-time collaboration, live cursor sync, and interactive canvas editing. Built with Next.js and Liveblocks, it empowers teams to co-create stunning visuals together.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body>
        <ToastContainer transition={Slide} />
        {children}
      </body>
    </html>
  );
}
