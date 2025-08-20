import { ThemeProvider } from "@/context/ThemeContext";
import React from "react";
import {GlobalsActionCableListenersProvider} from "@/context/GlobalsActionCableListenersContext";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-white z-1 dark:bg-gray-900 p-0">
      <ThemeProvider>
        <div className="relative w-full h-screen  dark:bg-gray-900 p-0">
            <GlobalsActionCableListenersProvider>
                {children}
            </GlobalsActionCableListenersProvider>
        </div>
      </ThemeProvider>
    </div>
  );
}
