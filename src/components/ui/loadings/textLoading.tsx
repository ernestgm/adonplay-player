import type React from "react";
import {Loading} from "@/components/ui/loadings/loading";

interface LoadingProps {
    words?: []; // en píxeles, opcional, por defecto 46
}

export const TextLoading: React.FC<LoadingProps> = ({words = []}) => {
    return (
        <div className="spinnerContainer">
            <Loading size={60} />
            <div className="loader">
                <p>loading</p>
                <div className="words">
                    {
                        words.map((word, index) => (
                            <span className="word" key={index}>{word}</span>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};