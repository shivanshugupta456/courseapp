export function readStoredJson(key) {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch (error) {
    console.error(`Invalid localStorage JSON for "${key}"`, error);
    window.localStorage.removeItem(key);
    return null;
  }
}
