export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  description?: string;
  category?: string;
  images?: string[];
  quantity?: number;
  type?: string;
  company?: string;
}
