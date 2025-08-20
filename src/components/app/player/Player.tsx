"use client";
import React, {useEffect, useState} from "react";
import {TextLoading} from "@/components/ui/loadings/TextLoading";
import {getDevice} from "@/server/api/devices";
import {getDeviceID} from "@/server/api/auth";
import Slides from "@/components/app/player/Slides";
import {changeDeviceActionsChannel} from "@/websockets/channels/changeDeviceAtionsChannel";

export default function Player() {
    const deviceId = getDeviceID()
    const [slideMedias, setSlideMedias] = useState([]);
    const [error, setError] = useState('');
    const [device, setDevice] = useState<any>(null);
    const [update, setUpdate] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDevice(deviceId);
                setDevice(data)
                setSlideMedias(data.slide_medias)
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
        <div>
            { device?.slide && slideMedias?.length > 0 ? (
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
            }
        </div>
    );
}
