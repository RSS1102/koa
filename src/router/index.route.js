const Router = require('koa-router')
const router = new Router({ prefix: "/api" })
const https = require('https')
const urlencode = require('urlencode');
const wxlogin = {
    APPID: "wx0a7924b7c9a2e3b6",
    scope: "snsapi_login",
    redirect_uri: urlencode.decode("http://www.cokbbs.games/index"),
}

router.get('/wxlogin', (res, req) => {

    const wx_href = `https://open.weixin.qq.com/connect/qrconnect?appid=${wxlogin.APPID}&redirect_uri=${wxlogin.redirect_uri}&response_type=code&scope=${wxlogin.scope}&state=STATE# wechat_redirect`;
    res.body = wx_href;


})
router.post('/wxcode', async(ctx, next) => {
    // 获取access_token
    console.log(ctx.request.body.urlSearchParams)
    let Code = ctx.request.body.urlSearchParams
    let SECRET = '1c63850cadf79db3bf0f1325e88136c3'
    https.get(`https://api.weixin.qq.com/sns/oauth2/access_token?appid=${wxlogin.APPID}&secret=${SECRET}&code=${Code}&grant_type=authorization_code`, (res => {

        console.log("--------------------------------------------------")
        res.on('data', (d) => {
            // json
            let token = JSON.parse(d)
            console.log("token", token)
            let ACCESS_TOKEN = token.access_token
            let OPENDID = token.openid
            console.log(ACCESS_TOKEN, OPENDID)
            https.get(`https://api.weixin.qq.com/sns/userinfo?access_token=${ACCESS_TOKEN}&openid=${OPENDID}`, (res => {
                res.on('data', (d) => {
                    let userinfo = JSON.parse(d)
                    console.log(userinfo)
                    res.body = userinfo
                        //应该储存在数据库内
                })

            }))

        });

    })).on('error', (e) => {
        console.error(e);
    })




    ctx.body = "3"
})


module.exports = router