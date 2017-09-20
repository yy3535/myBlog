
const express=require('express');
//引入模板
const swig=require('swig');

//处理前端的POST请求
const bodyParser = require('body-parser');

//引入连接数据库的插件（驱动）
const mongoose = require('mongoose');

const app=express();


//处理前端的POST请求的配置
//处理前端传给后端的表单格式数据（表单提交、ajax提交）  fromdata
app.use(bodyParser.urlencoded({ extended: false }))
//处理前端以json格式传给后端的数据 application/json 
app.use(bodyParser.json())

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



//引入拆分后路由
app.use('/',require('./routers/main'));
//处理ajax请求的路由
app.use('/api',require('./routers/api'));
//引入处理数据库的js路由
app.use('/db',require('./routers/db'));


//'mongodb://主机名ip地址:端口号/数据库的名字'
mongoose.connect('mongodb://localhost:27017/test',(error)=>{
    if(!error){
        console.log('数据库连接成功');
        app.listen(8080,()=>{
            console.log('web应用启动成功');
        });

    }
});

