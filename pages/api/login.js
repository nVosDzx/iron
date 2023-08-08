import { withSessionRoute } from "@/lib/utils/iron-session";

const VALID_EMAIL = "nvosdzx@gmail.com";
const VALID_PASSWORD = "nvos";

export default withSessionRoute(createSessionRoute);

async function createSessionRoute(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      req.session.user = {
        user_id: "did:22:nvos:22",
        user_email: "nvosdzx@gmail.com",
        username: "nVosDzx",
        isAdmin: true,
      };
      //Save session
      await req.session.save();
      return res.send({ ok: true }); // Return the response
    }

    return res.status(403).send(""); // Return the response
  }

  return res.status(404).send(""); // Return the response
}
