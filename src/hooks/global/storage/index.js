export function pushLocalStorage(key, data) {
  return localStorage.setItem(key, data);
}

export function peekLocalStorage(key) {
  return localStorage.getItem(key);
}

export function popLocalStorage(key) {
  return localStorage.removeItem(key);
}

export function popAllLocalStorage() {
  return localStorage.clear();
}
