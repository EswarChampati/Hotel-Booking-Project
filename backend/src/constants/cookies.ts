export const COOKIE_SETTINGS = {
  authCookie: {
    name: "authCookie",
    maxAge: 86400000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  },
};
