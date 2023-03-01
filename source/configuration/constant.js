const MAP_STATE = {
  F: "FROZEN",
  FROZEN: "F",
  N: "NORMAL",
  NORMAL: "N",
  D: "DELETED",
  DELETED: "D",
};

const MAP_CATEGORY = {
  A: "ACCOUNT",
  ACCOUNT: "A",
  S: "SYSTEM",
  SYSTEM: "S",
};

const SET_HASH = {
  FORMAT: "HEX",
  ALGORITHM: "SHA512",
  ITERATION: 1000,
  SALT_LENGTH: 64,
  HASH_LENGTH: 128,
};

module.exports = {
  MAP_STATE,
  MAP_CATEGORY,
  SET_HASH,
};
