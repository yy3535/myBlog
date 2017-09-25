/**
 * 专门用来操作数据库的js
 */
const express=require('express');

const router=express.Router();

const mongoose = require('mongoose');
//创建一张集合，schema
let userSchema= new mongoose.Schema({
    username:String,
    password:String
});
//创建一张集合，schema,artical表
let articleSchema= new mongoose.Schema({
    title:String,
    content:String
});
//用面向对象的思想去操作数据库
//我们不操作数据库本身，而是先造一个类（构造函数）,通过这个这个类
//创建的对象来操作数据库集合
//把这个对象和数据库的集合一一对应 映射
let User = mongoose.model('User', userSchema);//返回一个类  模型（modal）
let Article = mongoose.model('Article', articleSchema);
/*
class User{
    constructor(username){
        this.username=username;
    }

    save(){

    }
}
*/








//新增一条文档放到集合里
router.get('/save',(req,resp,next)=>{

    let user=new User({
        username:'zhangsan'+Math.random(),
        password:'123456'
    });
    user.save(function(error,user){
        if(!error){
            console.log('保存成功');
            resp.send('保存成功');
        }
    })
   
});



//获取所有的文章列表
router.get('/getArticleList',(req,resp,next)=>{
    Article.find({
        title:'标题'
    },function(error,articleList){
        if(!error){
            resp.json(articleList);
        }else{
            resp.send('查询失败');
        }
    })

});

//查询  对象写法
router.get('/query1',(req,resp,next)=>{
    User.find({
        username:'zhangsan'
    },function(error,userList){
        if(!error){
            console.log('查询成功',userList);
            resp.send(userList);
        }else{
            resp.send('查询失败');
        }
    })
    
   
});

//查询2  支持正则
router.get('/query2',(req,resp,next)=>{
    User.find({
        username:/zhangsan/g
    },function(error,userList){
        if(!error){
            console.log('查询成功',userList);
            resp.send(userList);
        }else{
            resp.send('查询失败');
        }
    })
    
   
});



//查询3    js表达式写法
router.get('/query3',(req,resp,next)=>{
   
    //下面的this是字符串  ，所以不会在这个箭头函数里执行，
    //会在 $where方法内部去解析执行
    //下面的this指的是 User类 内部创建的对象  new User()
    User.$where('this.username.indexOf("zhangsan") !== -1').exec(function (err, userList) {
         resp.send(userList);
    });
    
   
});

module.exports=router;
