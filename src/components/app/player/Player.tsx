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
import {TextLoading} from "@/components/ui/loadings/textLoading";

export default function Player() {
  return (
      <div>
        <div className="w-full h-screen lg:grid items-center">
          <div className="relative items-center justify-center  flex z-1">
            <TextLoading words={['slides', 'images', 'videos', 'audios', 'qrs']} />
          </div>
        </div>
      </div>
  );
}
