import { CLOUDINARY_CONFIG } from "@/config/cloudinary.config";

interface CloudinaryUploadResponse {
    secure_url: string;
    public_id: string;
    format: string;
    width: number;
    height: number;
}

export const uploadImageToCloudinary = async (file: File): Promise<string> => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", CLOUDINARY_CONFIG.uploadPreset);
        formData.append("folder", CLOUDINARY_CONFIG.folder);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
            {
                method: "POST",
                body: formData,
            }
        );

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data: CloudinaryUploadResponse = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error("Cloudinary upload error:", error);
        throw new Error("Failed to upload image. Please try again.");
    }
};

export const validateImageFile = (
    file: File
): { valid: boolean; error?: string } => {
    const MAX_SIZE = 5 * 1024 * 1024; // 5MB
    const ALLOWED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!ALLOWED_TYPES.includes(file.type)) {
        return {
            valid: false,
            error: "Only JPEG, PNG, and WebP images are allowed",
        };
    }

    if (file.size > MAX_SIZE) {
        return { valid: false, error: "Image size must be less than 5MB" };
    }

    return { valid: true };
};
