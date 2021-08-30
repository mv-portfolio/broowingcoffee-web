import {isJsonString, isObject} from 'utils/checker';

export function pushLocalStorage(key, data) {
  let value = data;
  if (isObject(value)) {
    value = JSON.stringify(data);
  }
  localStorage.setItem(key, value);
}

export function peekLocalStorage(key) {
  let value = localStorage.getItem(key);
  if (isJsonString(value)) {
    value = JSON.parse(value);
  }
  return value;
}

export function popLocalStorage(key) {
  return localStorage.removeItem(key);
}

export function popAllLocalStorage() {
  return localStorage.clear();
}
