export function fetchList(query) {
  return axios({
    url: '/realwarn',
    method: 'get',
    params: query,
  });
}

export function addWarn(query) {
  return axios({
    url: '/addwarn',
    method: 'post',
    data: query,
  });
}

export function unread() {
  return axios({
    url: '/unreadnum',
    method: 'get',
    showLoading: false,
  });
}

export default {};
