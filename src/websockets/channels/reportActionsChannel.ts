import {useEffect} from "react";
import cable from "@/websockets/actionCable";

export function reportActionsChannel(
    deviceId: any,
    onReceived: (data: unknown, suscription: any) => void,
    onDisconnect: () => void,
    onConnect: (suscription: any) => void
) {
    useEffect(() => {
        if (!cable) return;
        const subscription = cable.subscriptions.create(
            {channel: "ReportActionsChannel"},
            {
                received(data: unknown) {
                    console.log("📡 Acción recibida:", data);
                    if (onReceived) onReceived(data, subscription);
                },
                connected() {
                    onConnect(subscription);
                    console.log("✅ Conectado a ReportActionsChannel");
                },
                disconnected() {
                    console.log("❌ Desconectado de ReportActionsChannel");
                    onDisconnect()
                }
            }
        );

        return () => {
            console.log("🧹 Limpiando suscripción para el dispositivo:", deviceId);
            if (subscription) {
                subscription.unsubscribe();
            }
        };
    }, [deviceId]);
}
