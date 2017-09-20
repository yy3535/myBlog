/**
 * 跳转页面用的路由
 */

const express=require('express');

const router=express.Router();

//在这里可以写路由  router.get('/xxx',function(){})


//路由配置 http://localhost:8080/index
router.get('/index',(req,resp,next)=>{
    resp.render('index');
});

//访问路径:http://localhost:8080/a
router.get('/a',(req,resp,next)=>{
    resp.render('user/index');
});



//访问到注册页面
router.get('/register',(req,resp,next)=>{
    resp.render('register');
});

//接收GET表单提交的
router.get('/register/add',(req,resp,next)=>{
    resp.send('GET提交成功');
    console.log(req.query)
})

router.post('/register/add',(req,resp,next)=>{
    resp.send('POST提交成功');
    console.log(req.body);//配置了body-parser的插件后，req对象下会多一个属性body
})




module.exports=router;