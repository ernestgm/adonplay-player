"use client";

import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import {ErrorProvider} from "@/context/ErrorContext";
import {Suspense, useEffect} from "react";

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

    useEffect(() => {
        const setAppHeight = () => {
            document.documentElement.style.setProperty(
                "--app-height",
                `${window.innerHeight}px`
            )
        }
        setAppHeight()
        window.addEventListener("resize", setAppHeight)
        return () => window.removeEventListener("resize", setAppHeight)
    }, [])

  return (
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"/>
    </head>
    <body className={`${outfit.className} dark:bg-gray-900`}>
    <ThemeProvider>
    <SidebarProvider>
            <ErrorProvider>
              <Suspense>
                {children}
              </Suspense>
            </ErrorProvider>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
