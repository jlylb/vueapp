import store from "@/store"
import { getWxToken } from '@/tools/we_auth';
import router from '@/router';

const authUrl = 'http://c7e5dfd0.ngrok.io/'
//const authUrl = 'http://localhost:8080/uapi/we_oauth'

const getAuth = async(code)=>{
    let res = await	axios
        .get(authUrl+'we_oauth', {params: {code}})
        .then((res)=>{
                const { user } = res.data
                store.dispatch('wxuser/setOpenid', user.id)
                return res.data
        })

        console.log(res, 'await........')
        if(res) {
            await getAccessToken(res.id)
        }
        
}

export 	const getAccessToken = (openid)=>{
    return axios
    .get('/auth/bind-token', {params: {openid}})
    .then((res)=>{
        console.log(res, 'app vue')
        store.dispatch('user/refreshToken', res.data.access_token)
        store.dispatch('user/GetUserInfo')
    }).catch(e=>{
       // router.push({path: '/login', replace: true })
    })
}
// 判断公众号截取code
const getUrlParam = (name) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

	// 判断是否为公众号模拟器环境
export 	const isWechat = () => {
    return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === "micromessenger";
    // return true
}

// 获取用户信息
export const getWxUserInfo = async()=> {

    let appid = "wx1eaf570975a1bb11"; //为测试号id
    let code = getUrlParam("code"); //是否存在code
    const openid = getWxToken()
    // const openid = 'o7Ubxjm_-vD6GxOSkBa4bjMg3Agk'
    const local = window.location.href
    // const openid = null
    // const code = 1111
    //alert(openid)
    console.log(openid, 'await........openid')
    if (openid) {
        await  getAccessToken(openid)
        return
    }
    if (code == null || code === "") {
        //不存在就打开上面的地址进行授权
        window.location.href =
            `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`;
    }
    if(code){
      await  getAuth(code)
    }
    
}

// 获取用户信息
export const getJssdk = (data={})=> {
    return axios({
        url: authUrl+'jssdk',
        method: 'get',
        params: { ...data},
      });
}