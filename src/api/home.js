export default function checkUpdate(data) {
  /* eslint-disable */
  return axios({
    url: '/checkupdate',
    method: 'post',
    data,
  });
}
