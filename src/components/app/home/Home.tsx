"use client";
import React, {useEffect, useState} from "react";
import {getDeviceID} from "@/server/api/auth";
import {useError} from "@/context/ErrorContext";
import {getDevice} from "@/server/api/devices";
import GridShape from "@/components/common/GridShape";
import { Loading } from "@/components/ui/loadings/Loading";
import {useRouter} from "next/navigation";
import {changeDeviceActionsChannel} from "@/websockets/channels/changeDeviceAtionsChannel";


export default function Home() {
    const deviceId = getDeviceID()
    const [deviceName, setDeviceName] = useState('');
    const [slide, setSlide] = useState(null);
    const setError = useError().setError;
    const router = useRouter();

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
            } catch (err: any) {
                setError(err.data?.message || err.message || "Error al iniciar sesión");
            }
        };

        fetchData();
    }, [])

    changeDeviceActionsChannel(deviceId, async (data: any) => {
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
        <div className="d-flex flex-column flex-fill justify-content-center align-content-center p-5">
            <GridShape />
            <div className="mx-auto w-full max-w-content text-center">
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

                <div className="d-flex content-center flex-fill justify-content-center p-5">
                    <Loading />
                </div>
            </div>
        </div>
    );
}
