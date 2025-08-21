import { ThemeProvider } from "@/context/ThemeContext";
import React from "react";
import {GlobalsActionCableListenersProvider} from "@/context/GlobalsActionCableListenersContext";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-100 h-100 p-0 m-0">
        <GlobalsActionCableListenersProvider>
            {children}
        </GlobalsActionCableListenersProvider>
    </div>
  );
}
