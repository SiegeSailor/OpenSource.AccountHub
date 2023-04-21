const { HTTPS, SERVICE_HOST = "localhost", SERVICE_PORT = 80 } = process.env;

export default {
  HTTPS: Boolean(HTTPS),
  SERVICE_HOST,
  SERVICE_PORT: Number(SERVICE_PORT),
};
