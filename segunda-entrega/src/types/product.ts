export type TProductSize = "S" | "M" | "L";

export type TSizePrices = Partial<Record<TProductSize, number>>;

export interface IProduct {
    id: number;
    name: string;
    description: string;
    image: string;
    sizes: TSizePrices;
}
