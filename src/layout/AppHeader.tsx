"use client";
import UserDropdown from "@/components/header/UserDropdown";
import Image from "next/image";
import React, {useState} from "react";

const AppHeader: React.FC = () => {
    const [isApplicationMenuOpen] = useState(false);

    return (
        <div className="navbar shadow-sm bg-white" style={{zIndex: 1000}}>
            <div className="container d-flex justify-content-between">
                <Image
                                            className="navbar-brand d-flex align-items-center"
                                            src="/images/logo/logo.svg"
                                            alt="Logo"
                                            width={150}
                                            height={40}
                                        />
                <UserDropdown/>
            </div>
        </div>
    );
};

export default AppHeader;
