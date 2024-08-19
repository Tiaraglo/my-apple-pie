import { ObjectId } from "mongodb";

export type Product = {
  id: number;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
};

export type User = {};

export type Wishlist = {};
