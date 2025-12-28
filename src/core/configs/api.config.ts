import { get } from 'env-var';
import "dotenv/config";

export const apiConfig = {
  port: get('API_PORT').default('3000').asPortNumber(),
};
