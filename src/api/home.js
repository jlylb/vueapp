export function checkUpdate(data) {
  /* eslint-disable */
  return axios({
    url: '/checkupdate',
    method: 'post',
    data,
  });
}

export default function fetchList(query) {
  return axios({
    url: 'video',
    method: 'get',
    params: query,
  });
}