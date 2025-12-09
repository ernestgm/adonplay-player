const FILE_BASE_URL = process.env.NEXT_PUBLIC_PLAYER_UPLOAD_BASE_URL || "/";
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_PLAYER_UPLOAD_IMAGE_URL || "/";

export const mediaUrl = (file_path: string) => {
    console.log(FILE_BASE_URL + file_path)
    return FILE_BASE_URL + file_path
}
export const imageUrl = (file_path: string)=> {
    return IMAGE_BASE_URL + file_path
}