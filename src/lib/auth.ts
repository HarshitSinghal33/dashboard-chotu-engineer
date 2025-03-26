import { jwtVerify } from "jose";

export const getJwtSecretKey = () => {
  const secret = process.env.ADMIN_SECRET_PASSWORD;

  if (!secret || secret.length === 0) {
    throw new Error("The jwt is not set in env.");
  }

  return new TextEncoder().encode(secret);
};


export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token, getJwtSecretKey());
        return verified.payload
    } catch (error) {
        throw new Error("Your token is expired");
    }
}