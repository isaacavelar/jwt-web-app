import Koa, { Context } from 'koa';
import Router from 'koa-router';
import koaBody from 'koa-body';
import jwt from 'jsonwebtoken';

const server = new Koa();
const router = new Router();

const generateToken = () => {
    const secret: any = process.env.SECRET;

    const token = jwt.sign({ id: 0}, secret);
    return token;
}

const autenticateMiddleware = (ctx: Context, next: Function) => {
    const token  = ctx.header.authorization || '';
    const secret: any = process.env.SECRET;

    console.log('aqui')
    try {
        jwt.verify(token, secret);
    } catch (err) {
        ctx.body = { error: 'invalid token' }
        ctx.status = 401
    }
   
}

router.all(/^\/api\/v1\//gim, autenticateMiddleware);

router.get('/api/v1/users', (ctx: Context, next: Function) => {
    const users = [
        {
            _id: 0,
            name: 'Isaac Carvalho'
        }
    ];

    ctx.body = users;
});

router.post('/api/v1/users', (ctx: Context, next: Function) => {
    const payloadUser = ctx.request.body;
    const newUser = { _id: 1, ...payloadUser }
    
    ctx.body = newUser;
});

server.use(koaBody());
server.use(router.routes())
.use(router.allowedMethods());;

server.listen(3000, () => {
    console.log('🔥 HTTP Server runing!')
});