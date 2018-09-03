const TOKEN_NAME = 'token';

export function setToken(value) {
  return localStorage.setItem(TOKEN_NAME, value);
}

export function removeToken() {
  return localStorage.removeItem(TOKEN_NAME);
}

export function getToken() {
  return localStorage.getItem(TOKEN_NAME);
}
