"use client";
import React from "react";
import {getDataUserAuth} from "@/server/api/auth";

export default function UserDropdown() {
  const userData = getDataUserAuth()

  return (
    <div className="d-flex flex-row align-items-center">
      <span className="d-block font-medium text-theme-sm mx-3">
          {userData?.name || "Usuario"}
        </span>
      <span className="d-flex flex-row justify-content-center align-items-center rounded-circle bg-theme text-white text-center" style={{width: "30px", height: "30px"}}>
          <p className="m-0">{userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}</p>
        </span>
    </div>
  );
}
