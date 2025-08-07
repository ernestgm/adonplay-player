"use client";
import React, {useEffect, useState} from "react";
import {TextLoading} from "@/components/ui/loadings/TextLoading";
import Image from "next/image";
import mediaUrl from "@/utils/files";

interface SlidesProps {
    slideMedias?: any
}
export const Slides: React.FC<SlidesProps> = ({ slideMedias }) => {
    return (
        <div>
            { slideMedias ? (
                slideMedias.map((slideMedia, index) => (
                    <div key={index} className="w-full h-full relative">
                        {slideMedia.media.media_type === 'image' && (
                            <Image
                                src={mediaUrl(slideMedia?.media.file_path)}
                                alt="Cover"
                                className="w-full border border-gray-200 rounded-xl dark:border-gray-800"
                                fill
                            />
                        )}
                    </div>
                ))
            ) : (
                <TextLoading words={['images', 'videos', 'audios', 'qr', 'marquee']}/>
            )}
        </div>
    );
}
