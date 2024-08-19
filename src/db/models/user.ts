import { ObjectId } from "mongodb";
import { getMongoClientInstance } from "../config/mongo";
import { z } from "zod";
import { hashPassword } from "../utils/hash";

const DATABASE_NAME = process.env.MONGO_DB_NAME || "tryDB";

const COLLECTION_NAME = "Users";

export type UserModelType = {
  _id: ObjectId;
  name: string;
  username: string;
  email: string;
  password: string;
};

type UserRegisterType = {
  username: string;
  email: string;
  password: string;
};

type LoginUserType = {
  _id: ObjectId;
  email: string;
  password: string;
};

const getCollection = async () => {
  const client = await getMongoClientInstance();
  const db = client.db(DATABASE_NAME);
  const collection = db.collection(COLLECTION_NAME);

  return collection;
};

export const findAllUsers = async (): Promise<UserModelType[]> => {
  const collections = await getCollection();
  const data = (await collections.find().toArray()) as UserModelType[]; //CASTING PROCESS

  console.log(data, "ini data");

  return data;
};

export const findOneUser = async (id: string) => {
  const collections = await getCollection();

  const dataOneUser = (await collections.findOne({
    _id: new ObjectId(id),
  })) as UserModelType;

  return dataOneUser;
};

type UserPayloadType = Omit<UserModelType, "_id">;

export const createUser = async (payload: UserPayloadType) => {
  const collections = await getCollection();

  payload.password = hashPassword(payload.password);
  const newUser = await collections.insertOne(payload);

  const user = (await collections.findOne({
    _id: newUser.insertedId,
  })) as UserModelType;

  return user;
};

export const getUserByEmail = async (email: string) => {
  const collections = await getCollection();

  const user = (await collections.findOne({ email: email })) as UserModelType;

  return user;
};
