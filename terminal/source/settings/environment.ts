const {
  HTTPS,
  APPLICATION_HOST = "application",
  APPLICATION_PORT = 80,
} = process.env;

export default {
  HTTPS: Boolean(HTTPS),
  APPLICATION_HOST,
  APPLICATION_PORT: Number(APPLICATION_PORT),
};
