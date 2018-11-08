export function fetchList(query) {
  return axios({
    url: '/monitor/index',
    method: 'get',
    params: { ...query, mtype: 2 },
  });
}

export function fetchAreaDevice(params) {
  const data = { ...params, mtype: 2 };
  return axios({
    url: '/monitor/areadevice',
    method: 'post',
    data,
  });
}
