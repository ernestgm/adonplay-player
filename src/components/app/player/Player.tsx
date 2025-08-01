"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import GridShape from "@/components/common/GridShape";
import Image from "next/image";
import ThemeTogglerTwo from "@/components/common/ThemeTogglerTwo";

export default function Player() {
  return (
      <div>
        <div className="w-full h-screen bg-brand-950 dark:bg-white/5 lg:grid items-center">
          <div className="relative items-center justify-center  flex z-1">
            {/* <!-- ===== Common Grid Shape Start ===== --> */}
            <GridShape />
            <div className="flex flex-col items-center max-w-xs">
              <Link href="/" className="block mb-4">
                <Image
                    width={231}
                    height={48}
                    src="./images/logo/auth-logo.svg"
                    alt="Logo"
                />
              </Link>
              <p className="text-center text-gray-400 dark:text-white/60">
                Free and Open-Source Tailwind CSS Admin Dashboard Template
              </p>
            </div>
          </div>
        </div>
      </div>
  );
}
