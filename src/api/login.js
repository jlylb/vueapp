export function loginByUsername(username, password) {
  const data = {
    username,
    password,
  };
  return axios({
    url: '/auth/login',
    method: 'post',
    data,
  });
}

export function logout() {
  return axios({
    url: '/auth/logout',
    method: 'post',
  });
}

export function getUserInfo(data) {
  console.log(data);
  return axios({
    url: '/auth/userinfo',
    method: 'get',
    params: { data },
  });
}
export function saveUserInfo(data) {
  return axios({
    url: '/auth/userinfo',
    method: 'put',
    data,
  });
}

export function modifyPassword(data) {
  return axios({
    url: '/auth/password',
    method: 'put',
    data,
  });
}
