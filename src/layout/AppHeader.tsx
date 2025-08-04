"use client";
import {ThemeToggleButton} from "@/components/common/ThemeToggleButton";
import NotificationDropdown from "@/components/header/NotificationDropdown";
import UserDropdown from "@/components/header/UserDropdown";
import {useSidebar} from "@/context/SidebarContext";
import Image from "next/image";
import Link from "next/link";
import React, {useState, useEffect, useRef} from "react";

const AppHeader: React.FC = () => {
    const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);

    return (
        <header
            className="sticky top-0 flex w-full bg-white border-gray-200 z-99999 dark:border-gray-800 dark:bg-gray-900 lg:border-b">
            <div className="flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
                <div
                    className="flex items-center justify-between w-full gap-2 px-3 py-3 border-b border-gray-200 dark:border-gray-800 sm:gap-4 lg:justify-normal lg:border-b-0 lg:px-0 lg:py-4">
                    <div
                        className={`${
                            isApplicationMenuOpen ? "flex" : "hidden"
                        } items-center justify-between w-full gap-4 px-5 py-4 lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
                    >
                        <UserDropdown/>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AppHeader;
