import settings from "settings";

const format = {
  requestURL: function (path: string) {
    const protocol = settings.environment.HTTPS ? "https" : "http";
    return `${protocol}://${settings.environment.APPLICATION_HOST}:${settings.environment.APPLICATION_PORT}/${path}`;
  },
};

export default {
  format,
};
