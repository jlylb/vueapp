const TOKEN_NAME = 'wx_openid';

export function setWxToken(value) {
  return localStorage.setItem(TOKEN_NAME, value);
}

export function removeWxToken() {
  return localStorage.removeItem(TOKEN_NAME);
}

export function getWxToken() {
  return localStorage.getItem(TOKEN_NAME);
}
