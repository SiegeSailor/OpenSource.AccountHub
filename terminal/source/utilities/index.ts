import settings from "settings";

const format = {
  requestURL: function (path: string) {
    const protocol = settings.environment.HTTPS ? "https" : "http";
    return `${protocol}://${settings.environment.SERVICE_HOST}:${settings.environment.SERVICE_PORT}/${path}`;
  },
  message: async function (response: Response) {
    const result = await response.json();
    return `\t[${response.ok ? "INFO" : "FAILED"}] ${result.message}`;
  },
};

export default {
  format,
};
