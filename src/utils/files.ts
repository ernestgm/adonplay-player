// Lazy import firebase storage to avoid SSR import issues
let _storage: any | null = null;
async function getStorageLazy() {
    if (_storage) return _storage;
    const [{ getDownloadURL, ref }, { storage }] = await Promise.all([
        import("firebase/storage"),
        import("@/lib/firebase"),
    ]);
    // Re-export helpers on the storage object for convenience
    (_storage as any) = { storage, getDownloadURL, ref };
    return _storage;
}

// Simple in-memory cache for resolved Firebase URLs
const urlCache = new Map<string, string>();

export async function mediaUrl(file_path: string): Promise<string> {
    if (!file_path) return "";
    // If it's already an absolute URL (http/https), just return it
    if (/^https?:\/\//i.test(file_path)) return file_path;
    if (urlCache.has(file_path)) return urlCache.get(file_path)!;
    const { ref, getDownloadURL, storage } = await getStorageLazy();
    const r = ref(storage, file_path);
    const url = await getDownloadURL(r);
    urlCache.set(file_path, url);
    return url;
}

export async function imageUrl(file_path: string): Promise<string> {
    // Same logic for images
    return mediaUrl(file_path);
}