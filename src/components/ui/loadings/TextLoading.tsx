import type React from "react";
import {Loading} from "@/components/ui/loadings/Loading";

interface LoadingProps {
    label?: string;
    words?: []; // en píxeles, opcional, por defecto 46
}

export const TextLoading: React.FC<LoadingProps> = ({label = "loading", words = []}) => {
    return (
        <div className="spinnerContainer">
            <div className="mb-5">
                <Loading size={60}/>
            </div>
            {words.length > 0 ? (
                <div className="loader">
                    <p>{label}</p>
                    <div className="words">
                        {
                            words.map((word, index) => (
                                <span className="word" key={index}>{word}</span>
                            ))
                        }
                    </div>
                </div>
            ) : (
                <p className="uppercase text-title-md text-[#777]">{label}</p>
            )
            }
        </div>
    );
};