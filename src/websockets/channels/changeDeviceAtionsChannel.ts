import { useEffect } from "react";
import {initializeActionCable} from "@/websockets/actionCable";

export function changeDeviceActionsChannel(deviceId, onReceived) {
    useEffect(() => {
        if (!deviceId) return;
        const cable = initializeActionCable(deviceId)
        const subscription = cable.subscriptions.create(
            { channel: "ChangeDevicesActionsChannel", device_id: deviceId },
            {
                received(data) {
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
