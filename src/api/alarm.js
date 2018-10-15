export function fetchList(query) {
  return axios({
    url: '/realwarn',
    method: 'get',
    params: query,
  });
}
export default {};
