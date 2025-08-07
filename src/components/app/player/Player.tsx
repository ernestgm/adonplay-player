"use client";
import React, {useEffect, useState} from "react";
import {TextLoading} from "@/components/ui/loadings/TextLoading";
import {getDevice} from "@/server/api/devices";
import {getDeviceID} from "@/server/api/auth";
import {useError} from "@/context/ErrorContext";
import {Slides} from "@/components/app/player/Slides";

export default function Player() {
    const [loading, setLoading] = useState(true);
    const [slideMedias, setSlideMedias] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getDevice(getDeviceID());
                setSlideMedias(data.slide_medias)
                console.log(data);
            } catch (err) {
                setError(err.data?.message || err.message || "Server Error!!!");
            }
        };

        fetchData();
    }, [])

    return (
        <div>
            <div className="relative w-full h-screen flex flex-col justify-center">
                <div className="relative items-center justify-center  flex z-1">
                    { slideMedias ? (
                        <Slides slideMedias={slideMedias} />
                    ) : (
                        <TextLoading label="Waiting Device's Slides"/>
                    )}
                </div>
                { error &&(
                        <div className="absolute bottom-0 w-full h-content text-center">
                            <span className="text-3xl p-2 uppercase text-red-800">{error}</span>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
