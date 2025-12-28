import { get } from 'env-var';
import "dotenv/config";

export const siteConfig = {
  url: get('SITE_URL').required().asUrlString(),
};
