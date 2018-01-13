import Koa from'koa';
import http from "http";
import https from "https";
import koastatic from 'koa-static';
import router from 'koa-simple-router';
import co from 'co';
import koaSwig from 'koa-swig';
import path from "path";
import controllers from "./controllers/controllerInit";
import config from "./config/config";

const app = new Koa();


// x-response-time
app.use(async(ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
});

// logger
app.use(async(ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    //TODO:引入Log4js请求日志进行记录
    console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

//response
// app.use(async ctx => {
//     ctx.body = 'Hello World! myKoaweb!!!!!!';
// });
//console.log(controllers);
controllers.getAllRouters(app, router);
//静态资源
app.use(koastatic(config.staticDir)); 
//注入Render
app.context.render = co.wrap(koaSwig({
   root: config.viewDir, 
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    varControls: ['[[', ']]'],
    writeBody: false
}));


//error
app.on("error", err => {
    console.log('server error', err);
    //log.error('server error', err);
})

http.createServer(app.callback()).listen(3030);
//https.createServer(app.callback()).listen(4000);
console.log("Listening on port 3000!");