export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  imageUrl: string;
  createdAt: string;
  sizes?: string[]; // Array of available sizes
}

export interface CartItem {
  product: Product;
  quantity: number;
  size?: string; // Selected size
}
