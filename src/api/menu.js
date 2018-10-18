export function fetchList(query) {
  return axios({
    url: '/donghuang/index',
    method: 'get',
    params: query,
  });
}

export function fetchDevice(data) {
  return axios({
    url: '/donghuang/device',
    method: 'post',
    data,
  });
}

export default {};
