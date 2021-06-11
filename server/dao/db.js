var MongoClient = require('mongodb').MongoClient;

var driver = {};

driver.connect = function (callback, url) {

    MongoClient.connect(url, function (err, db) {
        var error;
        if (err) {
            error = { success: false, error: '数据库连接失败', msg: '数据库连接失败' };
        } else {
            callback(err, db);
        }
    });
};

driver.update = function (db, callback, table, update) {
    db.collection(table).update(query, update, function (err, result) {
        var res;
        var error;
        if (err) {
            error = { success: false, error: '查询异常', msg: '查询异常' };
        } else {

            res = { success: true, data: result };
        }

        db.close();

        callback(error, res);

    });
};

driver.insert = function (db, callback, table, query) {
    db.collection(table).insertOne(query).toArray(function (err, result) {
        var res;
        var error;
        if (err) {
            error = { success: false, error: '查询异常', msg: '查询异常' };
        } else {

            res = { success: true, data: result };
        }

        db.close();

        callback(error, res);


    });
};

driver.find = function (db, callback, table, query) {
    db.collection(table).find(query).toArray(function (err, result) {
        var res;
        var error;
        if (err) {
            error = { success: false, error: '查询异常', msg: '查询异常' };
        } else {

            res = { success: true, data: result };
        }

        db.close();

        callback(error, res);


    });
};

driver.page2 = function (db, callback, table, query, page_size) {


    db.collection(table).find(query).limit(page_size).toArray(function (err, result) {
        var res;
        var error;


        if (err) {
            error = { success: false, error: '查询异常', msg: '查询异常' };
        } else {

            /*db.collection(table).count(function (err, total) {
                res = {
                    success: true,
                    data: result,
                    page: {
                        totalCount: total,
                        pages: Math.ceil(total / page_size),
                        curPage: 1
                    }
                };

                db.close();

                callback(error, res);
            });*/

            res = {
                success: true,
                data: result
            };

            db.close();

            callback(error, res);

        }

    });
};

driver.page = function (db, callback, table, query, page_cur, page_size) {

    var count = (page_cur - 1) * page_size;
    db.collection(table).find(query).skip(count).limit(page_size).toArray(function (err, result) {
        var res;
        var error;


        if (err) {
            error = { success: false, error: '查询异常', msg: '查询异常' };
        } else {

            db.collection(table).find(query).count(function (err, total) {

                res = {
                    success: true,
                    data: result,
                    page: {
                        totalCount: total,
                        pages: Math.ceil(total / page_size),
                        curPage: page_cur
                    }
                };

                db.close();

                callback(error, res);
            });


            // res = {
            //     success: true,
            //     data: result
            // };

            // db.close();

            // callback(error, res);

        }

    });
};
module.exports = driver;
/*
async.waterfall([
    // 连接数据库        
    function (callback){
        driver.connect(callback,Url);
    },
    // 超找
    function (db,callback) {       
        driver.find(db, callback,table, _query);
    }],
    // result
    function (err, result) {
        console.log("resulte");
        

        for(var i in result.data){
            var item = result.data[i];
            if(item.password){
                delete item.password;
            }
            
        }
        if (err) {
            res.json(err);
            return;
        }
        res.json(result);
    }
);*/