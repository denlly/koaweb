const indexController = {
    getDate() {

    },
    index() {
        return async(ctx, next)=>  {
            //console.log(ctx);
        	ctx.body = await ctx.render("./index/pages/index.html", {
        		title:"fanxd 首页",
        		msg:"fanxd msg"
        	})
        }
    }
}

export 
default indexController