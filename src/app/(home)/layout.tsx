"use client";

import AppHeader from "@/layout/AppHeader";
import React from "react";
import {MessageProvider} from "@/context/MessageContext";
import {GlobalsActionCableListenersProvider} from "@/context/GlobalsActionCableListenersContext";

export default function AdminLayout({children,}: {
    children: React.ReactNode;
}) {
    return (
        <div className="h-100">
            <div className="d-flex flex-column h-100">
                {/* Header */}
                <AppHeader/>
                {/* Page Content */}
                <div className="d-flex flex-column flex-grow-1">
                    <MessageProvider>
                        <GlobalsActionCableListenersProvider>
                            {children}
                        </GlobalsActionCableListenersProvider>
                    </MessageProvider>
                </div>
                {/* <!-- Footer --> */}
                <p className="fixed-bottom text-sm text-center text-gray-500">
                    &copy; {new Date().getFullYear()} - AdOnPlay
                </p>
            </div>
        </div>
    );
}
