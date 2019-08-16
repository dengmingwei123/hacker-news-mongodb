// 引入MongoClient
var MongoClient = require("mongodb").MongoClient;

// 引入ObjectId
var ObjectId = require("mongodb").ObjectId;

// 创建数据库连接字符串
var connectStr = "mongodb://localhost:27017";

// 定义常量:数据库名
var DBNAME = "newsList";
// 定义常量:集合名
var COLNAME = "news";
module.exports={
    getAllNews:function(callback){
        // 连接数据库
        MongoClient.connect(connectStr,function(err,client){
            // 获取db对象
            var db = client.db(DBNAME);
            // 通过db,设置集合
            var news = db.collection(COLNAME);

            // 查询数据库信息
            news.find().toArray(function(err,newsArr){
                callback && callback(newsArr);
            })
            
            // 关闭数据库
            client.close();
        })
    },
    getNewsById:function(id,callback){
        // 连接数据库
        MongoClient.connect(connectStr,function(err,client){
            // 获取db对象
            var db = client.db(DBNAME);
            // 通过db操作集合
            var news = db.collection(COLNAME);
            // 根据id获取数据,mongodb中的id是ObjectId类型的,需要进行转换
            // ObjectId("id字符串")
            news.find({_id:ObjectId(id)}).toArray(function(err,newsArr){
                callback && callback(newsArr[0]);
            })

            // 关闭数据库
            client.close();
        })
    },
    addNews:function(data,callback){
        // 连接数据库
        MongoClient.connect(connectStr,function(err,client){
            // 获取db对象
            var db = client.db(DBNAME);
            // 通过db操作集合
            var news = db.collection(COLNAME);
            // 将数据写入数据库中
            news.insert(data,function(err,dbResult){
                if(dbResult.result.ok==1){
                    callback && callback();
                }
            })
            
            // 关闭数据库
            client.close();
        })
    }
}