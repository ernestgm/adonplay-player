"use client";

import {useSidebar} from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React from "react";
import {MessageProvider} from "@/context/MessageContext";
import GlobalLoadingIndicator from "@/components/ui/loading/globalLoadingIndicator";

export default function AdminLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen xl:flex">
            <div className={`flex-1 transition-all  duration-300 ease-in-out`}>
                {/* Header */}
                <AppHeader/>
                {/* Page Content */}
                <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
                    <MessageProvider>
                        {children}
                    </MessageProvider>
                </div>
            </div>
        </div>
    );
}
