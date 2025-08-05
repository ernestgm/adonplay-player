"use client";

import AppHeader from "@/layout/AppHeader";
import React from "react";
import {MessageProvider} from "@/context/MessageContext";
import {GlobalsActionCableListenersProvider} from "@/context/GlobalsActionCableListenersContext";

export default function AdminLayout({children,}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen xl:flex">
            <div className="flex flex-col min-h-screen transition-all  duration-300 ease-in-out">
                {/* Header */}
                <AppHeader/>
                {/* Page Content */}
                <div className="flex-1 flex items-center justify-center">
                    <MessageProvider>
                        <GlobalsActionCableListenersProvider>
                            {children}
                        </GlobalsActionCableListenersProvider>
                    </MessageProvider>
                </div>
                {/* <!-- Footer --> */}
                <p className="absolute bottom-0 text-sm text-center text-gray-500 -translate-x-1/2 bottom-6 left-1/2 dark:text-gray-400">
                    &copy; {new Date().getFullYear()} - AdOnPlay
                </p>
            </div>
        </div>
    );
}
