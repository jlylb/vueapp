export function fetchList(query) {
  return axios({
    url: '/monitor/index',
    method: 'get',
    params: query,
  });
}

export function fetchDevice(data) {
  return axios({
    url: '/donghuang/realdata',
    method: 'post',
    data,
  });
}

export function fetchAllDevice(data) {
  return axios({
    url: '/deviceinfo',
    method: 'get',
    params: data,
  });
}

export function fetchDeviceType(data) {
  return axios({
    url: '/deviceinfo/devicetype/all',
    method: 'get',
    params: data,
  });
}

export function postDevice(data) {
  return axios({
    url: '/donghuang/storedevice',
    method: 'post',
    data,
  });
}
