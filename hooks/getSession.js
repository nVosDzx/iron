import { verifyToken } from "@/lib/utils/token";

export async function getSession(req, res) {
  //Read token & session from request
  const cookies_token = req.cookies.token || null;
  const session_user = req.session.user || null;
  if (session_user) {
    //Assuming valide session
    if (cookies_token) {
      //Assuming token exists
      const data = verifyToken(cookies_token);
      if (!data) {
        //Assuming Invalide JWT
        res.setHeader(
          "Set-Cookie",
          "token=; HttpOnly; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Path=/"
        );
        req.session.destroy();
        return {
          user: null,
          token: null,
        };
      }
      const { uid, email } = data;
      const { user_id, user_email } = session_user;
      if (uid === user_id && email === user_email) {
        return {
          user: session_user,
          token: cookies_token,
        };
      } else {
        console.log("Error comparison, invalide arguments");
        res.setHeader(
          "Set-Cookie",
          "token=; HttpOnly; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Path=/"
        );
        req.session.destroy();
        return {
          user: null,
          token: null,
        };
      }
    } else {
      //Assuming token don't exist
      req.session.destroy();
      return {
        user: null,
        token: null,
      };
    }
  } else {
    res.setHeader(
      "Set-Cookie",
      "token=; HttpOnly; Secure; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; Path=/"
    );
    return {
      user: null,
      token: null,
    };
  }
}
