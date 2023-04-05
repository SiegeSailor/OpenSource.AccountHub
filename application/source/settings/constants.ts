enum State {
  FROZEN = "F",
  NORMAL = "N",
  CANCELED = "C",
}

export enum Category {
  ACCOUNT = "A",
  SYSTEM = "S",
  HISTORY = "H",
}

enum Nobility {
  NAIVE = 1,
  ADMIN = 100,
}

enum Milliseconds {
  NOW = 0,
  DAY = 24 * 60 * 60 * 1000,
}

enum Session {
  NAME = "ACCOUNT_HUB",
  PREFIX = "ACCOUNT_HUB:",
  USERNAME = "USERNAME",
}

enum Imitation {
  PASSWORD = "",
  SALT = "4cefc0fc0f928880e5ac01ad42fc69211030e337ee7b8938cad172dce40f84bee95c00f85f951d0a1341681b34ed98b8fdf0ca4cdec28971855a6f05c373b368",
}

export default {
  State,
  Category,
  Nobility,
  Milliseconds,
  Session,
  Imitation,
};
