export default function fetchList(query) {
  return axios({
    url: 'video',
    method: 'get',
    params: query,
  });
}
