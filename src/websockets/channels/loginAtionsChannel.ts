import { useEffect } from "react";
import cable from "@/websockets/actionCable";

export function useLoginActionsChannel(deviceId: any, onReceived: any) {
    useEffect(() => {
        if (!deviceId) return;
        const subscription = cable.subscriptions.create(
            { channel: "LoginActionsChannel", device_id: deviceId },
            {
                received(data: any) {
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
