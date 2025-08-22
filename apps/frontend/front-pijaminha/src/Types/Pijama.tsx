export interface PijamaSize {
  pajama_id: number;
  size: string;
  stock_quantity: number;
}

export interface Pijama {
  id: number;
  name: string;
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
export interface CartItem {
  id: string;  
  name: string;
  image: string;
  price: number;
  quantity: number;
  size: string;
}