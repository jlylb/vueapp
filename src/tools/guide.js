const TOKEN_NAME = 'is_guide';

export function setGuide(value) {
  return localStorage.setItem(TOKEN_NAME, value);
}

export function removeGuide() {
  return localStorage.removeItem(TOKEN_NAME);
}

export function getGuide() {
  return localStorage.getItem(TOKEN_NAME);
}
