export default function verifyCode(data) {
  return axios({
    url: '/verifycode',
    method: 'post',
    data,
  });
}
