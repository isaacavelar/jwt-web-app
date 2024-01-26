import Koa, { Context } from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';

const server = new Koa();
const router = new Router();

router.get('/users', (ctx: Context, next: Function) => {
    const users = [
        {
            _id: 0,
            name: 'Isaac Carvalho'
        }
    ];

    ctx.body = users;
});

router.post('/users', (ctx: Context, next: Function) => {
    const payloadUser = ctx.request.body;
    const newUser = { _id: 1, ...payloadUser }
    
    ctx.body = newUser;
});

server.use(koaBody());
server.use(router.routes());

server.listen(3000, () => {
    console.log('🔥 HTTP Server runing!')
})