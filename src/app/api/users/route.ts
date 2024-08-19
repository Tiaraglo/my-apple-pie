import { createUser, findAllUsers, UserModelType } from "@/db/models/user";
import { NextResponse } from "next/server";
import { z } from "zod";
export const dynamic = "force-dynamic";

type ResponseType<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

const userRegisterSchema = z.object({
  username: z.string(),
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(5),
});

export async function GET(request: Request) {
  const users = await findAllUsers();

  return NextResponse.json<ResponseType<UserModelType[]>>(
    {
      statusCode: 200,
      message: "Pong from GET /api/users !",
      data: users,
    },
    {
      status: 200,
    }
  );
}
