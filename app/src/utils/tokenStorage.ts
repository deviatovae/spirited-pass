const key = 'accessToken';

export const getAccessToken = (): string | null => localStorage.getItem(key);

export const setAccessToken = (token: string) =>
  localStorage.setItem(key, token);
