import { get } from 'env-var';
import "dotenv/config";

export const apiConfig = {
  port: get('API_PORT').default('3000').asPortNumber(),
  apiKey: get('API_KEY').required().asString(),
  url: get('API_URL').required().asString(),
};
