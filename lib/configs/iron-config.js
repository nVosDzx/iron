export const ironOptions = {
  cookieName: "BELIEF_NAILS_SESSION",
  password: process.env.IRON_PVK,
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV === "production" ? true : false,
  },
};
