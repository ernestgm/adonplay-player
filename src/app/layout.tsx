"use client";

import './polyfills'; // <--- PRIMERA LÍNEA
import './globals.css';

import {SidebarProvider} from '@/context/SidebarContext';
import {ThemeProvider} from '@/context/ThemeContext';
import {ErrorProvider} from "@/context/ErrorContext";
import {Suspense, useEffect} from "react";
import Script from "next/dist/client/script";

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
            <Script id="emergency-polyfills" strategy="beforeInteractive">{
                "if (typeof window.AbortController === 'undefined') {\n"+
                "              console.log('Patching AbortController...');\n"+
                "              // Script mínimo para evitar el crash inmediato\n"+
                "              window.AbortController = function() {\n"+
                "                return { signal: {}, abort: function() {} };\n"+
                "              };\n"+
                "            }\n"+
                "                if (typeof globalThis === 'undefined') {\n"+
                "                  window.globalThis = window;\n"+
                "                }\n"+
                "            }"
            }
            </Script>
        </head>
        <body className={`dark:bg-gray-900`}>
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
