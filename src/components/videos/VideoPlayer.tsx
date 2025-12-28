import React from "react";

interface IVideoPlayer {
    src: string | null | undefined;
    onLoaded?: () => void;
    loop?: boolean;
    posterUrl?: string;
}
export default function VideoPlayer({src, onLoaded, loop, posterUrl}: IVideoPlayer) {
    if (!src) {
        return <p>No video available.</p>; // Or null, or a placeholder
    }
    return (
        <div className="overflow-hidden rounded-lg w-100 h-100 bg-black">
            <video
                src={src || undefined}
                poster={posterUrl || undefined}
                controls={false}
                autoPlay={true}
                muted={true}
                loop={loop}
                preload="metadata"
                className="w-100 fullscreen"
                onLoadedData={onLoaded} // Se dispara cuando el video está listo
                onError={(e) => {
                    const error = e.currentTarget.error;
                    if (error) {
                        console.error(error);
                        }
                    console.log("Fallo en TV Box")
                }}
            >
                Tu navegador no soporta el reproductor de video.
            </video>
        </div>
    );
}
