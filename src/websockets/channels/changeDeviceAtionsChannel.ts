import { useEffect } from "react";
import cable from "@/websockets/actionCable";

export function changeDeviceActionsChannel(deviceId: any, onReceived: any) {
    useEffect(() => {
        if (!deviceId) return;
        const subscription = cable.subscriptions.create(
            { channel: "ChangeDevicesActionsChannel", device_id: deviceId },
            {
                received(data: any) {
                    console.log("📡 Acción recibida:", data);
                    if (onReceived) onReceived(data);
                },
                connected() {
                    console.log("✅ Conectado a ChangeDevicesActionsChannel");
                },
                disconnected() {
                    console.log("❌ Desconectado de ChangeDevicesActionsChannel");
                }
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [deviceId]);
}
