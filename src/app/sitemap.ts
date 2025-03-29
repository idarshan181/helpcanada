import type { MetadataRoute } from 'next';

import { getBaseURL } from '@/lib/getBaseURL';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseURL();

  const routes = [
    '',
    '/',
    '/login',
    '/contact-us',
    '/products',
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));
}
