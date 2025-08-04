import { useEffect } from "react";
import cable from "../lib/cable";
import {initializeActionCable} from "@/websockets/actionCable";

export function useLoginActionsChannel(deviceId, onReceived) {
    useEffect(() => {
        if (!deviceId) return;
        const cable = initializeActionCable(deviceId)
        const subscription = cable.subscriptions.create(
            { channel: "LoginActionsChannel", device_id: deviceId },
            {
                received(data) {
                    console.log("📡 Acción recibida:", data);
                    if (onReceived) onReceived(data);
                },
                connected() {
                    console.log("✅ Conectado a LoginActionsChannel");
                },
                disconnected() {
                    console.log("❌ Desconectado de LoginActionsChannel");
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [deviceId]);
}
