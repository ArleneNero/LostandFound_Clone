/**
 * Kategori barang resmi UBL LostnFound
 * Sesuai taksonomi master data v6.2
 */
export const ITEM_CATEGORIES = [
  'Elektronik',
  'Dokumen',
  'Kunci',
  'Dompet',
  'Tas',
  'Pakaian',
  'Aksesoris',
  'Lainnya',
] as const;

export type ItemCategory = (typeof ITEM_CATEGORIES)[number];

