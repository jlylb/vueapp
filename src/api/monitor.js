export function fetchList(query) {
  return axios({
    url: '/monitor/index',
    method: 'get',
    params: query,
  });
}

export function fetchDevice(data) {
  return axios({
    url: '/monitor/realdata',
    method: 'post',
    data,
  });
}
