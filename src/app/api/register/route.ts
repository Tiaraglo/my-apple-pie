import { createUser, UserModelType } from "@/db/models/user";
import { NextResponse } from "next/server";
import { z } from "zod";

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

export async function POST(request: Request) {
  try {
    const reqBody = await request.json();

    const validParse = userRegisterSchema.safeParse(reqBody);

    if (!validParse.success) {
      throw validParse.error;
    }

    const newUser = await createUser(validParse.data);

    return NextResponse.json<ResponseType<UserModelType>>(
      {
        statusCode: 201,
        message: "Succes to register a new account",
        data: newUser,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error, "ini errornya");
    return NextResponse.json<ResponseType<never>>(
      {
        statusCode: 400,
        error: "failed to register user",
      },
      {
        status: 400,
      }
    );
  }
}
