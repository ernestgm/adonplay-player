import type React from "react";
import {useEffect, useRef} from "react";

interface LoadingProps {
    size?: number; // en píxeles, opcional, por defecto 46
}
export const Loading: React.FC<LoadingProps> = ({size=46}) => {
    return (
        <div
            className="spinner"
            style={{ width: size, height: size }}
        />
    );
};