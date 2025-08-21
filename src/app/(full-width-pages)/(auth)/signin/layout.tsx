import GridShape from "@/components/common/GridShape";

import {ThemeProvider} from "@/context/ThemeContext";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function AuthLayout({children}: { children: React.ReactNode; }) {
    return (
        <div className="h-100 d-flex flex-row bd-highlight h-">
            <ThemeProvider>
                <div className="h-100 d-flex flex-row">
                    {children}
                    <div className="d-flex flex-fill justify-content-center p-5 bg-theme">
                        <div className="d-flex justify-content-center">
                            {/* <!-- ===== Common Grid Shape Start ===== --> */}
                            <GridShape/>
                            <div className="d-flex flex-column justify-content-center align-items-center">
                                <Image
                                    width={150}
                                    height={48}
                                    src="./images/logo/auth-logo.svg"
                                    alt="Logo"
                                    className="d-block align-self-center mb-1 object-fit-contain"
                                />
                                <p className="text-center text-white">
                                    Free and Open-Source Tailwind CSS Admin Dashboard Template
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </div>
    );
}
