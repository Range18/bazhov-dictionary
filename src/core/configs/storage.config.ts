import { get } from 'env-var';
import "dotenv/config";
import path from 'path';

const storagePathFromEnv = get('STORAGE_PATH').default('storage').asString();

export const storageConfig = {
  path: path.resolve(process.cwd(), storagePathFromEnv),
};

export const taleImagesStorageConfig = {
  path: path.join(storageConfig.path, 'tale-images'),
};
