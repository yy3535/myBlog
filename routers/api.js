/**
 * 用来处理ajax请求的路由
 */

const express=require('express');

const router=express.Router();

//在这里可以写路由  router.get('/xxx',function(){})

//读取json文件
let json=require('../json/test.json');

//http://localhost:8080/api/test
router.get('/test',(req,resp,next)=>{
    //输出静态json文件
    resp.json(json);
});

//访问路由 ：http://localhost:8080/api/test2
router.get('/test2',(req,resp,next)=>{
    //输出json
    let p={
        name:'张三',
        age:'30'
    };
    resp.json(p);
    
});

module.exports=router;