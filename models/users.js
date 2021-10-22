const md5 = require("md5")
var sqlite3 = require('sqlite3');
sqlite3.verbose();
var db  = new sqlite3.Database('./db02.sqlite',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    function(err) {
    if (err) return console.log(err.message);
    }
    );
    /*var id;
    var get_info=(data,callback)=>{
        db.all("select phone from users where phone = ?",[data],(err,row)=>{
        if (err) return console.log(err.message);
        if(row)
       
        return callback(row);
        
    });
}
get_info('0123457',(result)=>{
    if (result.length>0)
    {id=result;
    console.log(id);}
    else console.log('err');
});*/
exports.create = function (username, password, phonenumber) {
    db.run("INSERT INTO users (name, phone, pwd) "+
    "VALUES ( ?, ? , ? );",
    [ username, phonenumber,md5(password) ],
function(err) {
if (err) return console.log(err.message);
});
}
exports.updatePassword=function(userid,password){
    db.run("update users set pwd=? where id = ?",[md5(password),userid],(err)=>{
        if (err) return console.log(err.message);
        
    });
}
exports.updateBalance=(userid,balance,cashback)=>{
    db.run("update users set balance=?, points=? where id=?",[balance,cashback,userid],(err)=>{
        if (err) return console.log(err.message);
        

    })
}
exports.readPhonenumber=function(phonenumber,cb){
    db.get("select phone from users where phone = ?",[phonenumber],(err,row)=>{
        if (err) return console.log(err.message);
        return cb(row);
        
    });
    

}
exports.checkUser=(phonenumber,password,cb)=>{
    db.get("select id from users where phone=? and pwd=?",[phonenumber,md5(password)],(err,row)=>{
        if(err) return console.log(err.message);
        return cb(row);
    } )
}
exports.getFullInfo=(phonenumber,cb)=>{
    db.get("select * from users where phone=?",[phonenumber],(err,row)=>{
        if(err) return console.log(err.message);
        return cb(row);
    } )
}
exports.checkBalance=(id,cb)=>{
    db.get("select balance, points from users where id =?",[id],(err,row)=>{
        if(err) return console.log(err.message);
        return cb(row);
    } )
}