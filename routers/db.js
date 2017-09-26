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
    content:String,
    createDate:Date,
    delete:Number
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
router.get('/saveArticleList',(req,resp,next)=>{
    
        let article=new Article({
            title:'使用rem等比适配webApp所有屏幕',
            content:'rem是啥 rem 是相对于 html 元素的 font-size 的一个单位。如果 html 上定义了 font-size: 20px;，则无论在任何地方都是 1rem = 20px 这个大小不会受到父元素的影响...',
            createDate:new Date().toLocaleString(),
            delete:0
        });
        article.save(function(error,article){
            if(!error){
                console.log('保存成功');
                resp.send('保存成功');
            }
        })
       
    });



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
        delete:0
    },function(error,articleList){
        if(!error){
            let data={
                articleList:articleList
            }
            resp.json(data);
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
