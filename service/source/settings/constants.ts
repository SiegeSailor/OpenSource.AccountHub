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
  SESSION = "SESSION",
  ATTEMPT = "ATTEMPT",
}

enum EToken {
  EXPIRY_SECONDS = EMilliseconds.HOUR / 1000,
}

export default {
  EState,
  ECategory,
  ENobility,
  EMilliseconds,
  EStorePrefix,
  EToken,
};
