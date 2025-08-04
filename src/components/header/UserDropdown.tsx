"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import {getDataUserAuth} from "@/server/api/auth";

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const userData = getDataUserAuth()

function toggleDropdown(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
  e.stopPropagation();
  setIsOpen((prev) => !prev);
}

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown} 
        className="flex items-center text-gray-700 dark:text-gray-400 dropdown-toggle"
      >
        <span className="mr-3 overflow-hidden rounded-full h-11 w-11 flex items-center justify-center bg-blue-600 text-white font-bold text-lg">
          {userData?.name ? userData.name.charAt(0).toUpperCase() : "U"}
        </span>

        <span className="block mr-1 font-medium text-theme-sm">
          {userData?.name || "Usuario"}
        </span>
      </button>
    </div>
  );
}
