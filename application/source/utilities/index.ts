import crypto from "crypto";

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
};

export default {
  format,
  hash,
};
