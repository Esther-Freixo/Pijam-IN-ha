export interface PijamaSize {
  pajama_id: number;
  size: string;
  stock_quantity: number;
}

export interface Pijama {
  id: number;
  description: string;
  image: string;
  price: number;
  season: string;
  type: string;
  gender: string;
  favorite: boolean;
  on_sale: boolean;
  sale_percent?: number;
  sizes: PijamaSize[];
}
