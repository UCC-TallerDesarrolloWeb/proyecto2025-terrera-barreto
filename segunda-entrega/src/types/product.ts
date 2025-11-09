export type ProductSize = "S" | "M" | "L";

export type SizePrices = Partial<Record<ProductSize, number>>;

export interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    sizes: SizePrices;
}
