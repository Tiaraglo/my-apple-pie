import { ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongo";

const DATABASE_NAME = process.env.MONGO_DB_NAME || "tryDB";

const getCollection = async () => {
  const client = await getMongoClientInstance();
  const db = client.db(DATABASE_NAME);
  const collection = db.collection("Products");

  return collection;
};

export type ProductModelType = {
  _id: ObjectId;
  name: string;
  slug: string;
  description: string;
  excerpt: string;
  price: number;
  tags: string[];
  thumbnail: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
};

export const getAllProducts = async (): Promise<ProductModelType[]> => {
  const collections = await getCollection();

  const products = (await collections.find().toArray()) as ProductModelType[];

  return products;
};

export const getProductById = async (id: string) => {
  const collections = await getCollection();

  const detailOneProduct = (await collections.findOne({
    _id: new ObjectId(id),
  })) as ProductModelType;

  return detailOneProduct;
};

export const getProductBySlug = async (
  slug: string
): Promise<ProductModelType> => {
  const collections = await getCollection();
  const data = await collections.findOne({
    slug: slug,
  });
  return data as ProductModelType;
};

export const searchProductByName = async (
  name: string
): Promise<ProductModelType> => {
  const collections = await getCollection();
  const data = await collections.findOne({
    slug: name,
  });
  return data as ProductModelType;
};
