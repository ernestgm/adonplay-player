"use client";
import React, {useEffect, useState} from "react";
import {getDataUserAuth, getDeviceID, getLoginCode, signIn} from "@/server/api/auth";
import {useError} from "@/context/ErrorContext";
import {getDevice} from "@/server/api/devices";
import GridShape from "@/components/common/GridShape";
import {Loading} from "@/components/ui/loadings/loading";
import {useRouter, useSearchParams} from "next/navigation";
import {changeDeviceActionsChannel} from "@/websockets/channels/changeDeviceAtionsChannel";


export default function Home() {
    const userAuth = getDataUserAuth()
    const deviceId = getDeviceID()
    const [deviceName, setDeviceName] = useState('');
    const [slide, setSlide] = useState(null);
    const setError = useError().setError;
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDevice(deviceId);
                setDeviceName(data.name || deviceId)
                if (data?.slide) {
                    setSlide(data.slide)
                    router.push(`/player`)
                }
                console.log(data);
            } catch (err) {
                setError(err.data?.message || err.message || "Error al iniciar sesión");
            }
        };

        fetchData();
    }, [])

    changeDeviceActionsChannel(deviceId, async (data) => {
        if (data.type === "ejecute_slide_change") {
            if (data?.payload?.device?.slide) {
                setSlide(data.payload.device.slide)
                setDeviceName(data.payload.device.name || deviceId)
                router.push(`/player`)
            }
            console.log(data);
        }
    })

    return (
        <div className="relative flex flex-col items-center justify-center p-6 overflow-hidden z-1">
            <GridShape />
            <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
                {slide ? (
                        <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
                            {`Loading Player: (${ deviceName })`}
                        </h1>
                ) :
                    (
                    <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
                        {`Waiting Device's Slides: (${ deviceName })`}
                    </h1>
                    )
                }


                <div className="flex items-center justify-center space-x-2">
                    <Loading size={100} />
                </div>
            </div>
        </div>
    );
}
