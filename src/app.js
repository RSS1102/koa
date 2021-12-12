const koa = require('koa')
const koabody = require('koa-bodyparser')
const Router = require('koa-router')
const app = new koa()
const routers = require("./router/index.route")

//注册
/* 
注意这里：
1,是：koa-bodyparser，不是koa-body
2,koabody()要写在routers.routes()之前
*/
app.use(koabody()).use(routers.routes())


const post = 8080
app.listen(post, () => {
    console.log("serve:", `http://localhost:${post}`)
})