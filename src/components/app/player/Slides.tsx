"use client";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {mediaUrl, imageUrl} from "@/utils/files";
import {QRCodeCanvas} from "qrcode.react";
import Marquee from "react-fast-marquee";

interface SlidesProps {
    device?: any
    slideMedias?: any
}

export default function Slides({slideMedias, device}: SlidesProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mediaList, setMediaList] = useState<any[]>([]);
    const [isOnlyOne, setIsOnlyOne] = useState(true);

    useEffect(() => {
        setCurrentIndex(0)
        if (slideMedias) {
            const sorted = [...slideMedias].sort((a, b) => a.order - b.order);
            setMediaList(sorted);
        }
    }, [slideMedias]);

    useEffect(() => {
        if (mediaList.length === 0) return;

        setIsOnlyOne(mediaList.length === 1);

        const current = mediaList[currentIndex];
        const duration = current.audio_media
            ? getAudioDuration(mediaUrl(current.audio_media.file_path))
            : current.media.media_type === "video"
                ? getVideoDuration(mediaUrl(current.media.file_path))
                : current.duration * 1000;

        let timer: NodeJS.Timeout;
        Promise.resolve(duration).then((ms) => {
            timer = setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % mediaList.length);
            }, ms);
        });

        return () => clearTimeout(timer);
    }, [currentIndex, mediaList]);

    const current = mediaList[currentIndex];

    return (
        <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col">
            {current && (
                <div className="w-full h-full flex relative">
                    {current.media.media_type === "image" ? (
                        <div>
                            <Image
                                src={imageUrl(current.media.file_path)}
                                alt="Cover"
                                fill={true}
                                objectFit="fill"
                                quality={30}
                                className="w-full h-full object-fill blur-3xl opacity-30"
                                placeholder="blur"
                                blurDataURL={imageUrl(current.media.file_path)}
                            />
                            <Image
                                src={imageUrl(current.media.file_path)}
                                alt="Cover"
                                fill={true}
                                objectFit="contain"
                                quality={75}
                                className="w-full h-full object-fill"
                                placeholder="blur"
                                blurDataURL={imageUrl(current.media.file_path)}
                            />

                            {current.audio_media && (
                                <audio
                                    src={mediaUrl(current.audio_media.file_path)}
                                    autoPlay
                                    loop={isOnlyOne}
                                />
                            )}
                        </div>
                    ) : (
                        <video
                            src={mediaUrl(current.media.file_path)}
                            className="w-full h-full object-contain"
                            autoPlay
                            muted={true}
                            loop={isOnlyOne}
                            onEnded={() => setCurrentIndex((prev) => (prev + 1) % mediaList.length)}
                        />
                    )}
                </div>
            )}
            {(current?.description || device?.slide?.description) && (
                <div
                    className={` absolute z-999999 ${getPositionClass((current?.description && current?.description_position) || device?.slide?.description_position || 'br')} ${getTextSizeClass((current?.description && current?.text_size) || device?.slide?.description_size || 'sm')} text-white p-3 m-3 bg-[#333] rounded-md`}>
                    { current?.description || device?.slide?.description || ''}
                </div>
            )}

            {(current?.qr || device?.qr) && (
                <div
                    className={` absolute z-999999 bg-amber-50 rounded-b-sm ${getPositionClass(current?.qr?.position || device?.qr?.position || 'br')} p-1 m-3 `}>
                    <QRCodeCanvas value={current?.qr?.info || device?.qr?.info || ''} size={200}/>
                </div>
            )}
            {device.marquee && (
                <Marquee
                    style={{
                        backgroundColor: device.marquee.background_color,
                        color: device.marquee.text_color,
                        position: current?.media.media_type === "video" ? "absolute" : "sticky",
                        bottom: 0,
                    }}
                    className={`w-full text-8xl overflow-hidden p-4 sticky uppercase`}
                    speed={100}
                >
                    {device.marquee.message}
                </Marquee>
            )}
        </div>
    );
}

function getPositionClass(pos: string | null) {
    switch (pos) {
        case "tl":
            return "left-0 top-0";
        case "tc":
            return "top-0 left-1/2 transform -translate-x-1/2";
        case "tr":
            return "right-0 top-0";
        case "ml":
            return "top-1/2 left-0 transform -translate-y-1/2";
        case "mc":
            return "left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2";
        case "mr":
            return "right-0 top-1/2 transform -translate-y-1/2";
        case "bl":
            return "bottom-0 left-0";
        case "bc":
            return "bottom-0 left-1/2 transform -translate-x-1/2";
        case "br":
            return "bottom-0 right-0";
        default:
            return "bottom-0 right-0";
    }
}

function getTextSizeClass(pos: string | null) {
    switch (pos) {
        case "xs":
            return "text-2xl";
        case "sm":
            return "text-4xl";
        case "md":
            return "text-6xl";
        case "lg":
            return "text-8xl";
        case "xl":
            return "text-9xl";
        default:
            return "text-4xl";
    }
}

async function getAudioDuration(src: string): Promise<number> {
    return new Promise((resolve) => {
        const audio = new Audio(src);
        audio.addEventListener("loadedmetadata", () => {
            resolve(audio.duration * 1000);
        });
    });
}

async function getVideoDuration(src: string): Promise<number> {
    return new Promise((resolve) => {
        const video = document.createElement("video");
        video.src = src;
        video.addEventListener("loadedmetadata", () => {
            resolve(video.duration * 1000);
        });
    });
}
