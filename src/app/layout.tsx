
import type { Metadata } from "next";
import { Source_Serif_4, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});




const sourceSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Vishal Dewani Portfolio",
  description: "Web developer portfolio showcasing projects, blogs, and case studies.",
  icons: "/images/logo.png"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  


  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", sourceSerif.variable, "font-sans", inter.variable)}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        </body>
    </html>
  );
}
