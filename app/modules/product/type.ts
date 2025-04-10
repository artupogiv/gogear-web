export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  imageUrl: string;
  categorySlug: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Products = Product[];
