"use client";
import React, {useEffect, useMemo, useState} from "react";
import Image from "next/image";
import {mediaUrl, imageUrl} from "@/utils/files";
import {QRCodeCanvas} from "qrcode.react";
import Marquee from "react-fast-marquee";
import {Loading} from "@/components/ui/loadings/Loading";
import ReactPlayer from "react-player";
import VideoPlayer from "@/components/videos/VideoPlayer";

interface SlidesProps {
    device?: any
    slideMedias?: any
}

export default function Slides({slideMedias, device}: SlidesProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mediaList, setMediaList] = useState<any[]>([]);
    const [isOnlyOne, setIsOnlyOne] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);

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
        let isCanceled = false;

        async function scheduleNext() {
            let ms: number = current.duration * 1000;
            try {
                if (current.audio_media) {
                    const url = await mediaUrl(current.audio_media.file_path);
                    ms = await getAudioDuration(url);
                } else if (current.media.media_type === "video") {
                    const url = await mediaUrl(current.media.file_path);
                    ms = await getVideoDuration(url);
                }
            } catch (e) {
                // fallback to provided duration
            }
            if (!isCanceled) {
                timer = setTimeout(() => {
                    setCurrentIndex((prev) => (prev + 1) % mediaList.length);
                }, ms);
            }
        }

        let timer: NodeJS.Timeout;
        scheduleNext();

        return () => {
            isCanceled = true;
            if (timer) clearTimeout(timer);
        };
    }, [currentIndex, mediaList]);

    const current = mediaList[currentIndex];

    // Resolve current media URLs from Firebase Storage when needed
    const [resolvedImage, setResolvedImage] = useState<string>("/images/logo/placeholder.jpg");
    const [resolvedVideo, setResolvedVideo] = useState<string>("");
    const [resolvedAudio, setResolvedAudio] = useState<string>("");

    useEffect(() => {
        if (!current) return;
        let active = true;
        async function run() {
            try {
                if (current.media.media_type === "image") {
                    const url = await imageUrl(current.media.file_path);
                    if (active) setResolvedImage(url);
                } else if (current.media.media_type === "video") {
                    const url = await mediaUrl(current.media.file_path);
                    if (active) setResolvedVideo(url);
                }
                if (current.audio_media) {
                    const urlA = await mediaUrl(current.audio_media.file_path);
                    if (active) setResolvedAudio(urlA);
                } else {
                    if (active) setResolvedAudio("");
                }
            } catch (e) {
                // ignore, will fall back to legacy URLs in JSX
            }
        }
        run();
        return () => { active = false; };
    }, [current]);

    return (
        <div className="position-relative w-100 h-100 d-flex flex-column bg-theme">
            { current && (
                <div className="position-relative flex-grow-1">
                    { current.media.media_type === "image" ? (
                        <div>
                            <Image
                                src={resolvedImage}
                                alt="Cover"
                                fill={true}
                                quality={10}
                                className="object-fit-fill blur opacity-75"
                                priority
                                placeholder="blur"
                                blurDataURL={resolvedImage}
                            />
                            <Image
                                src={resolvedImage}
                                alt="Cover"
                                fill={true}
                                quality={75}
                                className="object-fit-contain"
                                priority
                                placeholder="blur"
                                blurDataURL={resolvedImage}
                            />

                            {current.audio_media && (
                                <audio
                                    src={resolvedAudio}
                                    autoPlay
                                    loop={isOnlyOne}
                                />
                            )}
                        </div>
                    ) : (
                        <div>
                            <div className={`d-flex flex-column justify-content-center align-content-center position-absolute w-100 h-100 bg-theme ${ isLoaded ? "d-none" : ""}`}>
                                <Loading />
                            </div>
                            <VideoPlayer
                                src={resolvedVideo}
                                onLoaded={() => setIsLoaded(true)}
                                loop={isOnlyOne}
                                posterUrl="/images/logo/placeholder.jpg"
                                onNext={() => setCurrentIndex((prev) => (prev + 1) % mediaList.length)}
                            />
                        </div>
                    )}
                </div>
            )}

            {(current?.description || device?.slide?.description) && (
                <div
                    className={` position-absolute z-999999 ${getPositionClass((current?.description && current?.description_position) || device?.slide?.description_position || 'br')} ${getTextSizeClass((current?.description && current?.text_size) || device?.slide?.description_size || 'sm')} text-white px-3 m-2 bg-theme rounded`}>
                    { current?.description || device?.slide?.description || ''}
                </div>
            )}

            {(current?.qr || device?.qr) && (
                <div
                    className={`d-flex position-absolute z-999999 bg-white rounded ${getPositionClass(current?.qr?.position || device?.qr?.position || 'br')} p-2 m-2 `}>
                    <QRCodeCanvas value={current?.qr?.info || device?.qr?.info || ''} size={150}/>
                </div>
            )}
            {device.marquee && (
                <Marquee
                    style={{
                        backgroundColor: device.marquee.background_color,
                        color: device.marquee.text_color,
                        position: current?.media.media_type === "video" ? "absolute" : "relative",
                        bottom: "0",
                        fontSize: "3em",
                    }}
                    className={`overflow-hidden p-1`}
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
            return "start-0 top-0";
        case "tc":
            return "top-0 start-50 -translate-x-middle";
        case "tr":
            return "end-0 top-0";
        case "ml":
            return "top-50 start-0 -translate-y-middle";
        case "mc":
            return "start-50 top-50 -translate-xy-middle";
        case "mr":
            return "end-0 top-50 -translate-y-middle";
        case "bl":
            return "bottom-0 start-0";
        case "bc":
            return "bottom-0 start-50 -translate-x-middle";
        case "br":
            return "bottom-0 end-0";
        default:
            return "bottom-0 end-0";
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
