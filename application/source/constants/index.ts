enum EState {
  F = "FROZEN",
  FROZEN = "F",
  N = "NORMAL",
  NORMAL = "N",
  C = "CANCELED",
  CANCELED = "C",
}

enum ECategory {
  A = "ACCOUNT",
  ACCOUNT = "A",
  S = "SYSTEM",
  SYSTEM = "S",
  H = "HISTORY",
  HISTORY = "H",
}

enum EHash {
  FORMAT = "HEX",
  ALGORITHM = "SHA512",
  ITERATION = 1000,
  SALT_LENGTH = 64,
  HASH_LENGTH = 128,
}

enum ENobility {
  NAIVE = 1,
}

export default {
  EState,
  ECategory,
  EHash,
  ENobility,
  TOKEN_EXPIRE_IN: "1D",
  PASSWORD_LENGTH: 16,
};
