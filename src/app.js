const koa = require('koa')
const Router = require('koa-router')
const app = new koa()
const routers = require("./router/index.route")
    //注册
app.use(routers.routes())

// app.use((res, req) => {
//     res.body = "来到后端"
// })

const post = 3003
app.listen(post, () => {
    console.log("serve:", `http://localhost:${post}`)
})