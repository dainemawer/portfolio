import * as migration_20260205_070817_initial from "./20260205_070817_initial";

export const migrations = [
  {
    up: migration_20260205_070817_initial.up,
    down: migration_20260205_070817_initial.down,
    name: "20260205_070817_initial",
  },
];
