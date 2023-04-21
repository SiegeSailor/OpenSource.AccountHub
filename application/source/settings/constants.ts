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
  MINUTE = 60 * 1000,
}

enum Prefix {
  SESSION = "ACCOUNT_HUB:",
  ATTEMPT = "ATTEMPT:",
}

export default {
  State,
  Category,
  Nobility,
  Milliseconds,
  Prefix,
};
