import settings from "settings";

const format = {
  requestURL: function (path: string) {
    return `${settings.environment.HTTPS ? "https" : "http"}://${
      settings.environment.APPLICATION_HOST
    }:${settings.environment.APPLICATION_PORT}/${path}`;
  },
};

export default {
  format,
};
