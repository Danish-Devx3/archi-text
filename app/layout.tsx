import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Archi-Text - Visualize chaos.",
  description: "Visualize chaos. Instantly convert natural language, code, and raw data into professional diagrams using local AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#0d1117] text-slate-300`}>{children}</body>
    </html>
  );
}
