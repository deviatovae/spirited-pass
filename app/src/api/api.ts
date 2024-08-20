import { createApiClient } from './schema';

export const api = createApiClient((method, url, params) =>
  fetch(url, {
    method,
    body: JSON.stringify(params),
    next: { revalidate: 10 },
  }).then((res) => res.json()),
);

api.setBaseUrl(
  (typeof window === 'undefined'
    ? process.env.API_URL
    : process.env.NEXT_PUBLIC_API_URL) ?? '',
);
