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

export default {
  State,
  Category,
  Nobility,
  Milliseconds,
  Session,
};
