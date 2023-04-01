enum State {
  FROZEN = "F",
  NORMAL = "N",
  CANCELED = "C",
}

enum Category {
  ACCOUNT = "A",
  SYSTEM = "S",
  HISTORY = "H",
}

enum Nobility {
  NAIVE = 1,
}

export default {
  State,
  Category,
  Nobility,
  TOKEN_EXPIRE_IN: "1D",
};
