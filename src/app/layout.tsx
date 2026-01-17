"use client";

import './polyfills'; // <--- PRIMERA LÍNEA
import './globals.css';

import {SidebarProvider} from '@/context/SidebarContext';
import {ThemeProvider} from '@/context/ThemeContext';
import {ErrorProvider} from "@/context/ErrorContext";
import {Suspense, useEffect} from "react";

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
            <script dangerouslySetInnerHTML={{ __html: `
                  if (typeof window.AbortController === 'undefined') {
                    (function(){
                      function AbortSignal() { this.aborted = false; this.onabort = null; }
                      function AbortController() { this.signal = new AbortSignal(); }
                      AbortController.prototype.abort = function() { 
                        this.signal.aborted = true; 
                        if (this.signal.onabort) this.signal.onabort(); 
                      };
                      window.AbortController = AbortController;
                      window.AbortSignal = AbortSignal;
                      console.log("AbortController polyfilled inline");
                    })();
                  }
                  if (typeof globalThis === 'undefined') {
                    window.globalThis = window;
                  }
            `}} />
            <script dangerouslySetInnerHTML={{ __html: `
              // ... (tus otros parches: AbortController, globalThis)
            
              if (typeof window.ResizeObserver === 'undefined') {
                window.ResizeObserver = function() {
                  return {
                    observe: function() {},
                    unobserve: function() {},
                    disconnect: function() {}
                  };
                };
                console.log("ResizeObserver mocked para evitar crash");
              }
            `}} />
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
