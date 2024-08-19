import { ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongo";
import { Product } from "../../../types";

const DATABASE_NAME = process.env.MONGO_DB_NAME || "tryDB";

const COLLECTION_NAME = "Wishlists";

export type WishlistModelType = {
  _id: ObjectId | string;
  userId: ObjectId;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
};

const getCollection = async () => {
  const client = await getMongoClientInstance();
  const db = client.db(DATABASE_NAME);
  const collection = db.collection(COLLECTION_NAME);

  return collection;
};

export const getALlWishlists = async (userId: string) => {
  const collections = await getCollection();

  const allWishlist = (await collections
    .find()
    .toArray()) as WishlistModelType[];

  console.log(allWishlist, "here all wishlist harus array of object");

  return allWishlist;
};

type WishlistPayloadType = Omit<WishlistModelType, "_id">;

export const addWishlist = async (payload: {
  userId: string;
  productId: string;
}) => {
  const collections = await getCollection();

  const newData = {
    userId: new ObjectId(payload.userId),
    productId: new ObjectId(payload.productId),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const newWishlist = await collections.insertOne(newData);

  const wishlist = (await collections.findOne({
    _id: newWishlist.insertedId,
  })) as WishlistModelType;

  return wishlist;
};

export const getWishlistUserLogin = async (userId: string): Promise<any[]> => {
  const collections = await getCollection();

  const agg = [
    {
      $match: {
        userId: new ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "Products",
        localField: "productId",
        foreignField: "_id",
        as: "wishlist",
      },
    },
    {
      $addFields: {
        products: {
          $arrayElemAt: ["$wishlist", 0],
        },
      },
    },
    {
      $project: {
        _id: 1,
        userId: 1,
        productId: 1,
        createdAt: 1,
        updatedAt: 1,
        products: {
          _id: 1,
          name: 1,
          slug: 1,
          description: 1,
          excerpt: 1,
          price: 1,
          tags: 1,
          thumbnail: 1,
          images: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    },
  ];

  const wishlist = await collections.aggregate(agg).toArray();
  // console.log(wishlist, "ini diaa");

  return wishlist;
};

export const deleteWishlist = async (id: string) => {
  const collections = await getCollection();

  const deleteWishlist = await collections.deleteOne({ _id: new ObjectId(id) });

  return deleteWishlist;
};
