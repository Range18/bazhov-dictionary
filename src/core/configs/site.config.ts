import { get } from 'env-var';

export const siteConfig = {
  url: get('SITE_URL').required().asUrlString(),
};
