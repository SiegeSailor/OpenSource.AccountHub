enum EState {
  FROZEN = "F",
  NORMAL = "N",
  CANCELED = "C",
}

enum ECategory {
  ACCOUNT = "A",
  SYSTEM = "S",
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
