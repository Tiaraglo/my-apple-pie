import jwt from "jsonwebtoken";
import * as jose from "jose";
const SECRET_KEY = process.env.SECRET_JWT || "tiaralucu";

export function signToken(payload: object) {
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
}

export function verifyToken(token: string) {
  const decoded = jwt.verify(token, SECRET_KEY);
  return decoded;
}

export const readPayloadJose = async <T>(token: string) => {
  const secretKey = new TextEncoder().encode(SECRET_KEY);
  const payloadJose = await jose.jwtVerify<T>(token, secretKey);

  return payloadJose.payload;
};
