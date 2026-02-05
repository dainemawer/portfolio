import * as migration_20260205_070817_initial from './20260205_070817_initial';
import * as migration_20260205_072013_add_articles_work from './20260205_072013_add_articles_work';

export const migrations = [
  {
    up: migration_20260205_070817_initial.up,
    down: migration_20260205_070817_initial.down,
    name: '20260205_070817_initial',
  },
  {
    up: migration_20260205_072013_add_articles_work.up,
    down: migration_20260205_072013_add_articles_work.down,
    name: '20260205_072013_add_articles_work'
  },
];
