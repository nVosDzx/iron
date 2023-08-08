import jwt from "jsonwebtoken";

export async function createJWT(user_id, email) {
  const JWToken = jwt.sign(
    {
      //Payload
      email: email,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000 + 1 * 24 * 60 * 60),
      "https://hasura.io/jwt/claims": {
        "x-hasura-allowed-roles": ["user", "admin"],
        "x-hasura-default-role": "user",
        "x-hasura-user-id": `${user_id}`,
      },
    },
    `${process.env.NEXT_PUBLIC_HASURA_JWT_KEY}` //Secret_Key
  );
  console.log("JWT created succefully : ", JWToken);
  return JWToken;
}

export const verifyToken = (token) => {
  const jwt = require("jsonwebtoken");
  // Sample token and secret key
  const JWT = token;
  const secretKey = process.env.NEXT_PUBLIC_HASURA_JWT_KEY;
  if (JWT) {
    try {
      // Verify the token
      const decodedToken = jwt.verify(JWT, secretKey);
      const data = {
        email: decodedToken.email,
        uid: decodedToken["https://hasura.io/jwt/claims"]["x-hasura-user-id"],
      };
      // If the verification is successful, the decoded payload will be available in the decodedToken variable
      return data;
    } catch (error) {
      // If the token is invalid or expired, an error will be thrown
      console.error("Token verification failed:", error.message);
    }
  }
  return null;
};
