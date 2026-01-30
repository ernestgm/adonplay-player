import html2canvas from 'html2canvas';
import {uploadFileToStorage} from "./firebaseStorage"; // Tu archivo de config de Firebase

class ScreenshotService {
    constructor(subscription) {
        this.subscription = subscription;
    }

    async takeAndSend(deviceId) {
        try {
            // 1. Capturar el body (o cualquier elemento del DOM)
            const element = document.body;
            const canvas = await html2canvas(element, {
                useCORS: true, // Importante para imágenes externas
                allowTaint: true
            });

            // 2. Convertir a Base64 (Data URL)
            const imageData = canvas.toDataURL("image/jpeg");
            // 3. Subir a Firebase Storage
            const uploaded = await uploadFileToStorage(imageData, `screenshots/${deviceId}.jpg`)
            const downloadURL = uploaded.downloadURL;
            // 5. Enviar la URL de vuelta por Action Cable
            this.subscription.perform('ready_screenshot', {
                body: {
                    action: "screenshot_ready",
                    device_id: deviceId,
                    url: `${downloadURL}&t=${new Date().getTime()}`
                }
            });

            return downloadURL;
        } catch (error) {
            console.error("Error en el proceso de screenshot:", error);
        }
    }
}

export default ScreenshotService;