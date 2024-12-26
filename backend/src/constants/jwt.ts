export const JWT_CONSTANT = {
  SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  DEFAULT_EXPIRATION: "1d",
};

export const JWT_ERROR_MESSAGE = {
  INVALID: "Invalid token ",
};
