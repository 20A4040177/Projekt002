var sqlite3 = require('sqlite3');
sqlite3.verbose();
var db  = new sqlite3.Database('./db02.sqlite',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    function(err) {
    if (err) return console.log(err.message);
    }
    );
exports.create = function (id, createddate, createdtime,total,cashback,status,phone, userID) {
    db.run("INSERT INTO transacts (id, createddate, createdtime,total,cashback,status,phone, userID) "+
    "VALUES ( ?, ? , ?,?,?,?,?,?);",
    [ id, createddate, createdtime,total,cashback,status,phone, userID ],
function(err) {
if (err) return console.log(err.message);
});
}
exports.updateStatus=function(status,id){
    db.run("update transacts set status=? where id = ?",[status,id],(err)=>{
        if (err) return console.log(err.message);
        
    });
}
exports.transactions=function(userid,cb){
    db.all("select * from transacts where userID=?",[userid],(err,row)=>{
        if (err) return console.log(err.message);
        return cb(row);
        
    });
}
exports.transaction=function(id,cb){
    db.all("select * from transacts where id=?",[id],(err,row)=>{
        if (err) return console.log(err.message);
        return cb(row);
        
    });
}

/*var test=(userid,cb)=>{db.all("select * from transacts where userID=?",[userid],(err,row)=>{
    if (err) return console.log(err.message);
    return cb(row);
    
});}
test(5,(result)=>{
    
    console.log(result);
})*/

/*
const dt = new Date();
let text = dt.toString();
var textInt=parseInt(text);
var transID=textInt.toString();
var todayDate = new Date().toISOString().slice(0, 10);
console.log(text);
var d = new Date();
var timenow = d.toLocaleTimeString();
var create = function (id, createddate, createdtime,total,cashback,status,phone, userID) {
    db.run("INSERT INTO transacts (id, createddate, createdtime,total,cashback,status,phone, userID) "+
    "VALUES ( ?, ? , ?,?,?,?,?,?);",
    [ id, createddate, createdtime,total,cashback,status,phone, userID ],
function(err) {
if (err) return console.log(err.message);
});
}
create(transID,todayDate,timenow,50000,4000,'complete','0123456789',5);
var date = new Date();
var dateStr =
  ("00" + (date.getMonth() + 1)).slice(-2) + "" +
  ("00" + date.getDate()).slice(-2) + "" +
  date.getFullYear() + "" +
  ("00" + date.getHours()).slice(-2) + "" +
  ("00" + date.getMinutes()).slice(-2) + "" +
  ("00" + date.getSeconds()).slice(-2);
console.log(dateStr);*/