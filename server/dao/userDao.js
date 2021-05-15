var MongoClient = require('mongodb').MongoClient;

var async = require('async');

var driver = require('./db');

var response = require('./response');

const Url = "mongodb://localhost:27017/manhua";

const table = 'dmzj';

const table2 = '1kkk';



function connect(callback) {
    driver.connect(callback, Url);
}

var userDao = {};
/**
 * 
 * @param {*name ,type} param 
 * @param {*} res 
 */
userDao.search = function (param, res) {

    var _query = { "title": { '$regex': param.name, '$options': 'i' } };

    var table = param.type;

    async.waterfall([
        // 连接数据库        
        function (callback) {
            driver.connect(callback, Url);
        },
        // 超找
        function (db, callback) {

            driver.find(db, callback, table, _query);
        }],
        // result
        function (err, result) {
            console.log("resulte");

            if (err) {
                res.json(err);
                return;
            }
            res.json(result);
        }
    );
};

/**
 * 
 * @param {*size lastid type} param 
 * @param {*} res 
 */
userDao.page = function (param, res) {
    var _query;

    if(param.sort){
        _query= { '_id': { '$gt': require('mongodb').ObjectId(param.id) } };
    }else{
        _query = {};
    }

    var table = param.type || 'dmzj';

    var page_size =Number(param.size) || 10;

    var page_cur =Number(param.curPage) || 1;

    var table = param.type;

    async.waterfall([
        // 连接数据库        
        function (callback) {
            driver.connect(callback, Url);
        },
        // 分页
        function (db, callback) {
            driver.page(db, callback, table, _query,page_cur, page_size);
        }],
        // result
        function (err, result) {
            console.log("resulte");

            if (err) {
                res.json(err);
                return;
            }
            res.json(result);
        }
    );



};

module.exports = userDao;