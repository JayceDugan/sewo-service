import Koa from 'koa';
import Router from 'koa-router';
import logger from 'koa-logger'
import json from 'koa-json';
import { createSqlConnection } from '../integrations/database'

const PORT = process.env.port || 3000

const app = new Koa();
const router = new Router();

router.get('/healthCheck', async (ctx, next) => {
    try {
        ctx.body = { msg: 'Ok.' }
        await next()
    } catch(err) {
        console.error((err as Error).message)
    }
})

app.use(json())
app.use(logger())
app.use(router.routes()).use(router.allowedMethods())

createSqlConnection()

app.listen(PORT, () => {
    console.log(`API listening on ${PORT}.`)
})