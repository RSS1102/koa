const Router = require('koa-router')
const router = new Router({ prefix: "/api" })
const https = require('https')
const wxlogin = {
    APPID: "wx0a7924b7c9a2e3b6",
    scope: "snsapi_login",
    redirect_uri: "http://www.cokbbs.games/index",
}

router.get('/wxlogin', (res, req) => {

    const wx_href = `https://open.weixin.qq.com/connect/qrconnect?appid=${wxlogin.APPID}&redirect_uri=${wxlogin.redirect_uri}&response_type=code&scope=${wxlogin.scope}&state=STATE# wechat_redirect`;
    res.body = wx_href;


})
router.post('/wxcode', async(ctx, next) => {
    // 获取access_token
    console.log(ctx.request.body.urlSearchParams)
    let Code = '071LhPkl2MChh84ecrml2vxIE33LhPkB'
    let SECRET = '1c63850cadf79db3bf0f1325e88136c3'
    const token = https.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wxlogin.APPID}&secret=${SECRET}&code=${Code}&grant_type=authorization_code`)
    console.log(token)



    ctx.body = "3"
})


module.exports = router