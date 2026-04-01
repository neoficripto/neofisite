export const assetUrl = (path) => {
  const base = typeof import.meta !== 'undefined' ? (import.meta.env?.BASE_URL || '/') : '/';
  const normalizedBase = base.endsWith('/') ? base : `${base}/`;
  const normalizedPath = String(path || '').replace(/^\//, '');
  return `${normalizedBase}${normalizedPath}`;
};

