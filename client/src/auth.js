import jwtDecode from 'jwt-decode';

const accessTokenKey = 'accessToken';
const loginUrl = 'http://localhost:8080/login';

function getUserFromToken(token) {
  return jwtDecode(token).sub;
}

export function getAccessToken() {
  return localStorage.getItem(accessTokenKey);
}

export function getLoggedInUser() {
  const token = getAccessToken();
  if (!token) {
    return null;
  }
  return getUserFromToken(token);
}

export async function login(name, password) {
  const response = await fetch(loginUrl, {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({name, password})
  });
  console.log(response);
  if (!response.ok) {
    return null;
  }
  const {token} = await response.json();
  console.log(token);
  localStorage.setItem(accessTokenKey, token);
  return getUserFromToken(token);
}

export function logout() {
  localStorage.removeItem(accessTokenKey);
}
