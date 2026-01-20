import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { PlayerProvider } from "./context/PlayerContext";
import AudioPlayer from "./components/AudioPlayer";

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex", // Short and clean variable name
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thmanyah Podcast Search",
  description: "Technical Assignment for Thmanyah",
  icons: {
    icon: "/favicon.ico?v=2", // or "/logo.png" if you used a png
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png", // Optional: for iPhone home screen
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${ibmPlexArabic.variable} font-sans bg-brand-bg text-gray-900`}
      >
        <PlayerProvider>
          {children}
          <AudioPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
