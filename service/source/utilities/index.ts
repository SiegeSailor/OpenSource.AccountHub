import type { Request } from "express";
import crypto from "crypto";

import settings from "settings";
import databases from "databases";

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
  capitalize: function (input: string) {
    return input.charAt(0).toUpperCase() + input.slice(1);
  },
  resource: function (request: Request) {
    return `${request.method} ${encodeURI(request.originalUrl)}`;
  },
  bracket: function (count: number) {
    return `(${Array.from({ length: count }).fill("?").join(", ")})`;
  },
  statement: function (length: number, count: number) {
    return Array.from({ length }).fill(format.bracket(count)).join(", ");
  },
  escape: function (input: string) {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
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

const store = {
  update: async function (key: string, value: string) {
    const transaction = databases.store.multi();
    transaction.pttl(key);
    transaction.set(key, value, "XX");

    const results = await transaction.exec();
    if (!results) return null;

    const ttl = results[0][1] as string | number;
    const result = results[1][1];
    switch (ttl) {
      case settings.constants.ETTL.NO_KEY:
      case settings.constants.ETTL.NO_TTL:
        return null;
      default:
        break;
    }

    if (result !== "OK")
      throw new Error(`Encountered errors while updating ${key} in session.`);

    await databases.store.pexpire(key, ttl);
    return result;
  },
};

export default {
  format,
  hash,
  key,
  store,
};
