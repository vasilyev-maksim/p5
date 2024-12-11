export function getQsParam(key: string, defaultValue?: string) {
  return new URLSearchParams(window.location.search).get(key) || defaultValue;
}
