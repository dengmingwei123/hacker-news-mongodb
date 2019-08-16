var express = require("express");
var storage = require("./storage-mongo");


var app = express();

app.use(function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");

    // 使用中间件
    next();
})

// 首页
app.get("/api/getallnews",function(req,res,next){
    // 获取数据库所有新闻数据，返回给前端
    storage.getAllNews(function(newsArr){
        res.send({
            success:"true",
            message:"获取成功",
            data:newsArr
        })
    })
})

// 详情页
app.get("/api/getnewsbyid",function(req,res,next){
    // 根据id获取数据库的新闻数据,返回前端
    storage.getNewsById(req.query.id,function(news){
        res.send({
            success:"true",
            message:"获取成功",
            data:news
        })
    })
})

// 添加新闻
app.get("/api/addnews",function(req,res,next){
    // 根据获取的数据,添加数据
    storage.addNews(req.query,function(){
        res.send({
            success:"true",
            message:"添加成功"
        })
    })
})

app.listen(8888,function(){
    console.log("http://localhost:8888");
})