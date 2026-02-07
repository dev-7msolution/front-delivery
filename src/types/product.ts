export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  empresaId?: number;
  categoryName?: string;
  image?: string;
  active: boolean;
  createdAt?: string;
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  image?: string;
  active: boolean;
}
