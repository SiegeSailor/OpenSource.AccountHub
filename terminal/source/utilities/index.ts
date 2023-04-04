import settings from "settings";

const format = {
  requestURL: function (path: string) {
    const protocol = settings.environment.HTTPS ? "https" : "http";
    return `${protocol}://${settings.environment.APPLICATION_HOST}:${settings.environment.APPLICATION_PORT}/${path}`;
  },
  message: async function (response: Response) {
    const result = await response.json();
    return `\t[${response.ok ? "SUCCESSFUL" : "FAILED"}] ${result.message}`;
  },
};

export default {
  format,
};
