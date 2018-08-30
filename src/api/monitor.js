export function fetchList(query) {
  return axios({
    url: '/monitor/index',
    method: 'get',
    params: query,
  });
}

export function fetchDevice(query) {
  return axios({
    url: '/monitor/air',
    method: 'get',
    params: query,
  });
}
