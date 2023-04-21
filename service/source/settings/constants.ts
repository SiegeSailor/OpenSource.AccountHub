enum EState {
  FROZEN = "F",
  NORMAL = "N",
  CANCELED = "C",
}

export enum ECategory {
  ACCOUNT = "A",
  SYSTEM = "S",
  HISTORY = "H",
}

enum ENobility {
  NAIVE = 1,
  ADMIN = 100,
}

enum EMilliseconds {
  NOW = 0,
  HOUR = 60 * 60 * 1000,
  DAY = 24 * 60 * 60 * 1000,
  MINUTE = 60 * 1000,
}

enum EStorePrefix {
  SESSION = "ACCOUNT_HUB:",
  ATTEMPT = "ATTEMPT:",
}

export default {
  EState,
  ECategory,
  ENobility,
  EMilliseconds,
  EStorePrefix,
};
