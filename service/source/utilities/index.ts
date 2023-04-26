import crypto from "crypto";

import settings from "settings";

const hash = {
  SALT_LENGTH: 64,
  PASSWORD_ITERATION: 1000,
  PASSWORD_HASH_LENGTH: 128,
  PASSWORD_DIGITAL_SIGNATURE: "SHA512",

  encode: function (buffer: Buffer) {
    return buffer.toString("hex");
  },
  salt: function () {
    return hash.encode(crypto.randomBytes(hash.SALT_LENGTH));
  },
  password: function (passcode: string, salt: string) {
    return hash.encode(
      crypto.pbkdf2Sync(
        passcode,
        salt,
        hash.PASSWORD_ITERATION,
        hash.PASSWORD_HASH_LENGTH,
        hash.PASSWORD_DIGITAL_SIGNATURE
      )
    );
  },
};

const format = {
  response: function (message: string, data?: { [key: string]: any }) {
    return {
      message,
      data,
    };
  },
  time: function () {
    const date = new Date();
    return `${date.toTimeString().slice(0, 8)}`;
  },
  statement: function (length: number, count: number) {
    const bracket = `(${Array.from({ length: count }).fill("?").join(", ")})`;
    return Array.from({ length }).fill(bracket).join(", ");
  },
};

const key = {
  attempt: function (email: string) {
    return `${settings.constants.EStorePrefix.ATTEMPT}:${email}`;
  },
  session: function (identifier: string) {
    return `${settings.constants.EStorePrefix.SESSION}:${identifier}`;
  },
};

export default {
  format,
  hash,
  key,
};
