"use client";

import {Outfit} from 'next/font/google';
import './globals.css';

import {SidebarProvider} from '@/context/SidebarContext';
import {ThemeProvider} from '@/context/ThemeContext';
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
            console.log("Windows height", window.outerHeight)
            document.documentElement.style.setProperty(
                "--app-height",
                `${window.outerHeight}px`
            )
        }
        setAppHeight()
        window.addEventListener("resize", setAppHeight)
        return () => window.removeEventListener("resize", setAppHeight)
    }, [])

    // Register Service Worker for media caching
    useEffect(() => {
        if (typeof window === 'undefined' || !('serviceWorker' in navigator)) return;
        console.log('Registering SW...');
        const register = async () => {
            try {
                await navigator.serviceWorker.register('/sw.js', { scope: '/' });
            } catch (e) {
                console.warn('SW registration failed', e);
            }
        };
        // Delay registration until app idle to avoid competing with critical resources
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(register);
        } else {
            setTimeout(register, 0);
        }
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
