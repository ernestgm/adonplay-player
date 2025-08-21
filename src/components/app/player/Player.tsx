"use client";
import React, {useEffect, useState} from "react";
import {TextLoading} from "@/components/ui/loadings/TextLoading";
import {getDevice} from "@/server/api/devices";
import {getDeviceID} from "@/server/api/auth";
import Slides from "@/components/app/player/Slides";
import {changeDeviceActionsChannel} from "@/websockets/channels/changeDeviceAtionsChannel";
import {useRouter} from "next/navigation";

export default function Player() {
    const router = useRouter();
    const deviceId = getDeviceID()
    const [loading, setLoading] = useState(true);
    const [slideMedias, setSlideMedias] = useState([]);
    const [error, setError] = useState('');
    const [device, setDevice] = useState<any>(null);
    const [update, setUpdate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const data = await getDevice(deviceId);
                setLoading(false)
                setDevice(data)
                setSlideMedias(data.slide_medias)
                if (data?.slide_medias === null || data?.slide_medias?.length === 0) {
                    router.push(`/`)
                }
            } catch (err: any) {
                setError(err.data?.message || err.message || "Server Error!!!");
            }
        };

        fetchData();
    }, [update])

    changeDeviceActionsChannel(deviceId, async (data: any) => {
        if (data.type === "ejecute_data_change") {
            console.log(data);
            setUpdate(data.payload)
        }
    })

    return (
        <div className="h-100 d-flex flex-column flex-fill justify-content-center align-content-center">
            { loading ? (
                <TextLoading label="Updating Device Data..."/>
            ) : (
                device?.slide && slideMedias?.length > 0 ? (
                    <Slides device={device} slideMedias={slideMedias} />
                ) : (
                    <div className="relative w-full h-screen flex flex-col justify-center">
                        <div className="relative items-center justify-center  flex z-1">
                            { !device?.slide ? (
                                <TextLoading label="Waiting Device's Slides"/>
                            ) : !slideMedias || slideMedias?.length === 0 && (
                                <TextLoading label="Waiting Device's Slides Media Data"/>
                            )}
                        </div>
                        { error &&(
                            <div className="absolute bottom-0 w-full h-content text-center">
                                <span className="text-3xl p-2 uppercase text-red-800">{error}</span>
                            </div>
                        )
                        }
                    </div>
                )
            )}
        </div>
    );
}
