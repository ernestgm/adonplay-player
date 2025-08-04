import React, { createContext, useContext, useState } from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {changeUserActionsChannel} from "@/websockets/channels/changeUserAtionsChannel";
import Cookies from "js-cookie";

interface GlobalsActionCableListenersContextProps {
  message: string | null;
  setMessage: (message: string | null) => void;
}

const GlobalsActionCableListenersContext = createContext<GlobalsActionCableListenersContextProps | undefined>(undefined);

export const GlobalsActionCableListenersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  changeUserActionsChannel(Cookies.get("device_id"), async (data) => {
    console.log(data);
    if (data.type === "change_user") {
      console.log(data);
      Cookies.remove("auth_token");
      Cookies.remove("user");
      router.push("/signin");
    }
  })

  return (
    <GlobalsActionCableListenersContext.Provider value={undefined}>
      {children}
    </GlobalsActionCableListenersContext.Provider>
  );
};
