"use client"

import React, { createContext, useContext, useState } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {changeUserActionsChannel} from "@/websockets/channels/changeUserAtionsChannel";
import Cookies from "js-cookie";
import {signOut} from "@/server/api/auth";

interface GlobalsActionCableListenersContextProps {
  message: string | null;
  setMessage: (message: string | null) => void;
}

const GlobalsActionCableListenersContext = createContext<GlobalsActionCableListenersContextProps | undefined>(undefined);

export const GlobalsActionCableListenersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  changeUserActionsChannel(Cookies.get("device_id"), async (data: any) => {
    console.log(data);
    if (data.type === "change_user") {
      console.log(data);
      signOut()
      router.push("/");
    }

    if (data.type === "user_logout_action") {
      console.log(data);
      signOut()
      router.push("/");
    }
  })

  return (
    <GlobalsActionCableListenersContext.Provider value={undefined}>
      {children}
    </GlobalsActionCableListenersContext.Provider>
  );
};
