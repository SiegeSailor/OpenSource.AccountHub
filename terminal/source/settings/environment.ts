const {
  HTTPS,
  APPLICATION_HOST = "localhost",
  APPLICATION_PORT = 80,
} = process.env;

export default {
  HTTPS: Boolean(HTTPS),
  APPLICATION_HOST,
  APPLICATION_PORT: Number(APPLICATION_PORT),
};
