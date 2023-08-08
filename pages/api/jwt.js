import { createJWT, verifyToken } from "@/lib/utils/token";

export default async function (req, res) {
  if (req.method === "POST") {
    const user_id = "did:22:nvos:22";
    const email = "nvosdzx@gmail.com";
    const JWT = await createJWT(user_id, email);
    const decodedVersion = verifyToken(JWT);
    res.send({ JWT, decodedVersion });
  } else {
    res.status(500).send({ error: "Invalide request method." });
  }
}
