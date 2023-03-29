const format = {
  response: function (message: string, data?: Record<string, string>) {
    return {
      message,
      data,
    };
  },
};

export default {
  format,
};
