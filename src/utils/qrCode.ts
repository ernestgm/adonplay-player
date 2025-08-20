export default function handleDownloadQr()  {
    const canvas: any | null = document.getElementById("qrcode-canvas");
    if (canvas) {
        const url = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = url;
        a.download = `qrcode.png`;
        a.click();
    }
};