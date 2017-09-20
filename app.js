
const express=require('express');
//引入模板
const swig=require('swig');

const app=express();

//配置静态资源目录(可配置多个)
app.use('/public',express.static(__dirname+'/public'));
//app.use('/lib',express.static(__dirname+'/lib'));

//模板配置--------------------------------
//配置应用模板
 //定义当前应用所使用的模板引擎
 //第一个参数：模板引擎的名称，同时也是模板文件的后缀
 //第二个参数：表示用于解析处理引擎模板内容的方法
app.engine('html',swig.renderFile);

//设置模板文件存放的目录
//第一个参数是固定的views
//第二个参数是 目录
app.set('views','./views');


//注册所使用的模板引擎
//第一个参数是固定的 view engine
//第二个参数和app.engine中定义的模板引擎的名称是一样的
app.set('view engine','html');

//设置不缓存
//在开发模式下这样是可以的
//在发布时  下面这行代码要删除  
swig.setDefaults({
    cache:false
});

//模板配置end-------------------------------


//路由配置 http://localhost:8080/index
app.get('/index',(req,resp,next)=>{
    resp.render('index');
});

//访问路径:http://localhost:8080/a
app.get('/a',(req,resp,next)=>{
    resp.render('user/index');
});



app.listen(8080,()=>{
    console.log('web应用启动成功');
})