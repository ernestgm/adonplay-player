"use client";

import React, {useEffect, useState} from "react";
import {getDeviceID, getLoginCode, setUserCookies, signIn} from "@/server/api/auth";
import Cookies from "js-cookie";
import {useError} from "@/context/ErrorContext";
import {QRCodeCanvas} from "qrcode.react";
import {useLoginActionsChannel} from "@/websockets/channels/loginAtionsChannel";
import {useRouter, useSearchParams} from "next/navigation";
import {TextLoading} from "@/components/ui/loadings/TextLoading";

export default function SignInForm() {
    const [loading, setLoading] = useState(false);
    const deviceId = getDeviceID()
    const [code, setCode] = useState<string[]>([]);
    const setError = useError().setError;
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const deviceCode = Cookies.get("device_code");
                const data = await getLoginCode(deviceId, deviceCode);
                if (data?.token) {
                    setUserCookies(data.token, JSON.stringify(data.user))
                    const redirect = searchParams.get("redirect");
                    router.push(redirect || "/");
                } else {
                    console.log(data);
                    setCode(String(data?.code).split(""))
                    setLoading(false);
                }
            } catch (err: any) {
                setError(err.data?.message || err.message || "Error al iniciar sesión");
            }
        };

        fetchData();
    }, []);

    useLoginActionsChannel(deviceId, async (data: any) => {
        if (data.type === "ejecute_login") {
            try {
                setLoading(true);
                const response = await signIn(
                    data.payload.code,
                    data.payload.device_id,
                    data.payload.user_id
                )
                setUserCookies(response.token, JSON.stringify(response.user))
                const redirect = searchParams.get("redirect");
                router.push(redirect || "/");
            } catch (err: any) {
                setLoading(false);
                setError(err.data?.message || err.message || "Error al iniciar sesión");
            }

        }
    })

    return (
        <div className="d-flex flex-fill justify-content-center p-2">
            <div className="d-flex justify-content-center align-items-center p-5">
                <div>
                    { loading ? (
                        <TextLoading label="Loading..." />
                    ) : (
                        <div className="d-flex flex-column justify-content-center">
                            <h1 className="text-center">
                                Sign In
                            </h1>

                            <p className="text-center text-gray-600 mb-10">Please scan the QR code below or enter the 6-digit code to
                                activate your
                                device.</p>

                            <div className="d-flex align-self-center mb-3">
                                <QRCodeCanvas
                                    value={ process.env.NEXT_PUBLIC_PLAYER_ACTIVATE_DEVICE_URL || "" }
                                    size={150}
                                />
                            </div>

                            <div className="mb-6">
                                <p className="text-center text-gray-700 text-lg font-semibold mb-2">Activation Code</p>
                                <div className="d-flex justify-content-center space-x-2">
                                    {
                                        code.map((digit, index) => {
                                            return (
                                                <span key={index} className="m-1 px-3 py-2 rounded-lg border rounded border-theme">{digit}</span>
                                            )
                                        })
                                    }
                                </div>

                                <p className="text-center text-sm text-gray-500 mt-4">For assistance, please contact support.</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
