import { get } from 'env-var';

export const storageConfig = {
  path: get('STORAGE_PATH').default('./storage').asString(),
  nameLength: 16,
};
