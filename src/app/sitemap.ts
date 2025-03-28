import type { MetadataRoute } from 'next';

import { getBaseURL } from '@/lib/getBaseURL';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseURL();

  // Add your static routes
  const routes = [
    '',
    '/login',
    '/dashboard',
    '/contact-us',
    '/pricing',
    '/blogs',
    // Add dynamic routes
    // Add your other routes her
  ];

  return routes.map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: route === '' ? 1 : 0.8,
  }));
}
