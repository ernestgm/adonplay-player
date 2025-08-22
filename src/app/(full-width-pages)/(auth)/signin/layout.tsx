import GridShape from "@/components/common/GridShape";

import {ThemeProvider} from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({children}: { children: React.ReactNode; }) {
    return (
        <div className="h-100 w-100 d-flex flex-row bd-highlight">
            {children}
            <div className="d-flex flex-fill justify-content-center p-5 bg-theme">
                <div className="d-flex justify-content-center">
                    {/* <!-- ===== Common Grid Shape Start ===== --> */}
                    <GridShape/>
                    <div className="d-flex flex-column justify-content-center align-items-center p-5">
                        <Image
                            src="/images/logo/logo-notext.png"
                            alt="Logo"
                            width={150}
                            height={150}
                        />
                        <h1 className="text-center text-white">AdOnPlay</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}
