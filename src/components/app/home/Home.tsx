"use client";
import React, {useEffect, useState} from "react";
import {getDeviceID} from "@/server/api/auth";
import {useError} from "@/context/ErrorContext";
import {getDevice} from "@/server/api/devices";
import GridShape from "@/components/common/GridShape";
import { Loading } from "@/components/ui/loadings/Loading";
import {useRouter} from "next/navigation";
import {changeDeviceActionsChannel} from "@/websockets/channels/changeDeviceAtionsChannel";
import {TextLoading} from "@/components/ui/loadings/TextLoading";


export default function Home() {
    const deviceId = getDeviceID()
    const [deviceName, setDeviceName] = useState('');
    const [slide, setSlide] = useState(null);
    const [slideMedias, setSlideMedias] = useState([]);
    const setError = useError().setError;
    const router = useRouter();
    const [update, setUpdate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDevice(deviceId);
                setDeviceName(data.name || deviceId)
                setSlide(data.slide)
                setSlideMedias(data.slide_medias)
                if (data?.slide) {
                    if (data?.slide_medias?.length > 0) {
                        router.push(`/player`)
                    }
                }
                console.log(data);
            } catch (err: any) {
                setError(err.data?.message || err.message || "Error al iniciar sesión");
            }
        };

        fetchData();
    }, [update])

    changeDeviceActionsChannel(deviceId, async (data: any) => {
        if (data.type === "ejecute_data_change") {
            setUpdate(data.payload)
            console.log(data);
        }
    })

    return (
        <div className="d-flex flex-column flex-fill justify-content-center align-content-center p-5">
            <GridShape />
            <div className="mx-auto w-full max-w-content text-center">
                { slide ? (
                    slideMedias?.length === 0 ? (
                            <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
                                {`Waiting Device's Slides Media Data: (${ deviceName })`}
                            </h1>
                        ) : (
                            <h1 className="mb-8 font-bold text-gray-800 text-title-md dark:text-white/90 xl:text-title-2xl">
                                {`Loading Player: (${ deviceName })`}
                            </h1>
                        )
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
