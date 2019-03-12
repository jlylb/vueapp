export function fetchList(query) {
  return axios({
    url: '/monitor/index',
    method: 'get',
    params: query,
  });
}

export function fetchDevice(data, loading = true) {
  const config = {
    url: '/donghuang/realdata',
    method: 'post',
    data,
    showLoading: loading,
  };
  return axios(config);
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

export function fetchAreaDevice(data) {
  return axios({
    url: '/monitor/areadevice',
    method: 'post',
    data,
  });
}

export function updateDevice(data) {
  return axios({
    url: `/donghuang/${data.pdi_index}/update`,
    method: 'put',
    data,
  });
}

export function deleteDevice(pdi) {
  return axios({
    url: `/donghuang/${pdi}`,
    method: 'delete',
  });
}

export function fetchAreas(data) {
  return axios({
    url: '/monitor/index',
    method: 'get',
    params: { ...data, isArea: false },
  });
}
