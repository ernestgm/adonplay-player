"use client";

import React, {useEffect, useState} from "react";
import {getLoginCode, signIn} from "@/server/api/auth";
import Cookies from "js-cookie";
import {useError} from "@/context/ErrorContext";
import {QRCodeCanvas} from "qrcode.react";
import {useLoginActionsChannel} from "@/websockets/channels/loginAtionsChannel";
import {useRouter, useSearchParams} from "next/navigation";

export default function SignInForm() {
    const [loginCode, setLoginCode] = useState(null);
    const [code, setCode] = useState([]);
    const setError = useError().setError;
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const deviceId = Cookies.get("device_id");
                const deviceCode = Cookies.get("device_code");

                const data = await getLoginCode(deviceId, deviceCode);
                setLoginCode(data);
                setCode(String(data?.code).split(""))
            } catch (err) {
                setError(err.data?.message || err.message || "Error al iniciar sesión");
            }
        };

        fetchData();
    }, []);

    useLoginActionsChannel(Cookies.get("device_id"), async (data) => {
        console.log(data);
        if (data.type === "ejecute_login") {
            try {
                const response = await signIn(
                    data.payload.code,
                    data.payload.device_id,
                    data.payload.user_id
                )
                Cookies.set("auth_token", response.token, { path: "/" });
                Cookies.set("user", JSON.stringify(response.user), { path: "/" });
                const redirect = searchParams.get("redirect");
                router.push(redirect || "/");
            } catch (err) {
                setError(err.data?.message || err.message || "Error al iniciar sesión");
            }

        }
    })

    function generateCodeHtml(code) {
        // Ensure the code is a 6-digit string
        const codeString = String(code).padStart(6, '0').slice(0, 6);

        let spansHtml = '';
        for (let i = 0; i < codeString.length; i++) {
            const digit = codeString[i];
            spansHtml += `<span class="text-4xl font-mono font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-200">${digit}</span>`;
        }

        return `<div class="flex justify-center space-x-2">${spansHtml}</div>`;
    }

    return (
        <div className="flex flex-col flex-1 lg:w-1/2 w-full">
            <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
                <div>
                    <div className="mb-5 sm:mb-8 flex flex-col items-center">
                        <h1 className="mb-10 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
                            Sign In
                        </h1>

                        <p className="text-center text-gray-600 mb-10">Please scan the QR code below or enter the 6-digit code to
                            activate your
                            device.</p>

                        <div className="mb-10">
                            <QRCodeCanvas value={process.env.NEXT_PUBLIC_ACTIVATE_DEVICE_URL} size={200}/>
                        </div>

                        <div className="mb-6">
                            <p className="text-center text-gray-700 text-lg font-semibold mb-2">Activation Code</p>
                            <div className="flex justify-center space-x-2">
                                {
                                    code.map((digit, index) => {
                                    return (
                                        <span key={index} className="text-4xl font-mono font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg border border-indigo-200">{digit}</span>
                                        )
                                    })
                                }
                            </div>

                            <p className="text-center text-sm text-gray-500 mt-10">For assistance, please contact support.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
