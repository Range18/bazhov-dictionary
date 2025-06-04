import { get } from 'env-var';

export const apiConfig = {
  port: get('API_PORT').default('3000').asPortNumber(),
};
