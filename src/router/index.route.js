const Router = require('koa-router')
const router = new Router({ prefix: "/" })

router.get('/', (res, req) => {
    res.body = "koa"
})



module.exports = router