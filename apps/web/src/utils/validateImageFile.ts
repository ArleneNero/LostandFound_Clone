export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export const IMAGE_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;
export function validateImageFile(file: File): string | null {
  if (!IMAGE_MIME_TYPES.includes(file.type as (typeof IMAGE_MIME_TYPES)[number]))
    return 'Gunakan foto JPG, PNG, atau WebP.';
  if (file.size < 1) return 'File foto kosong.';
  if (file.size > MAX_IMAGE_BYTES) return 'Ukuran foto maksimal 5 MiB.';
  return null;
}
