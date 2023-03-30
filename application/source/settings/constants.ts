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

enum ENobility {
  NAIVE = 1,
}

export default {
  EState,
  ECategory,
  ENobility,
  TOKEN_EXPIRE_IN: "1D",
  PASSWORD_LENGTH: 16,
};
