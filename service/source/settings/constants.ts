enum EAccountState {
  FROZEN = "F",
  NORMAL = "N",
  CANCELED = "C",
}

export enum EHistoryCategory {
  ACCOUNT = "A",
  SYSTEM = "S",
  HISTORY = "H",
}

enum EStorePrefix {
  SESSION = "SESSION",
  ATTEMPT = "ATTEMPT",
}

enum EMilliseconds {
  NOW = 0,
  HOUR = 60 * 60 * 1000,
  DAY = 24 * 60 * 60 * 1000,
  MINUTE = 60 * 1000,
}

enum EJWT {
  EXPIRY_SECONDS = EMilliseconds.HOUR / 1000,
}

enum EDatabaseCode {
  DUP_ENTRY = "ER_DUP_ENTRY",
  DUPLICATE_KEY = "ER_DUPLICATE_KEY",
}

export default {
  EAccountState,
  EHistoryCategory,
  EStorePrefix,
  EMilliseconds,
  EJWT,
  EDatabaseCode,
};
