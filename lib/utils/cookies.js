import cookie from "cookie";
import { parse } from "cookie";
const MAX_AGE = 7 * 24 * 60 * 60;

export const setTokenCookie = (token, res) => {
  const setCookie = cookie.serialize("token", token, {
    maxAge: MAX_AGE,
    expires: new Date(Date.now() + MAX_AGE * 1000),
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
  res.setHeader("Set-Cookie", setCookie);
};

export const setTokenCookieClientSide = (token) => {
  const expirationDate = new Date(Date.now() + MAX_AGE * 1000).toUTCString();
  const cookieValue =
    encodeURIComponent(token) +
    `; expires=${expirationDate}; max-age=${MAX_AGE}; path=/`;

  document.cookie = `token=${cookieValue}`;
};

export const getTokenFromHeaders = (cookieHeader) => {
  if (cookieHeader) {
    const cookies = parse(cookieHeader || "");
    const token = cookies.token;
    return token;
  }
  return null;
};

export const removeTokenCookie = (res) => {
  const removeCookie = cookie.serialize("token", "", {
    maxAge: -1,
    path: "/",
  });
  res.setHeader("Set-Cookie", removeCookie);
};
