import { withSessionRoute } from "@/lib/utils/iron-session";

export default withSessionRoute(logout);

async function logout(req, res, session) {
  res.setHeader(
    "Set-Cookie",
    "token=; HttpOnly; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Path=/"
  );
  req.session.destroy();
  res.send({ ok: true });
}
