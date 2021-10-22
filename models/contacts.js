var sqlite3 = require('sqlite3');
sqlite3.verbose();
var db  = new sqlite3.Database('./db02.sqlite',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    function(err) {
    if (err) return console.log(err.message);
    }
    );
exports.create = function (name, phone, savedname, userID) {
    db.run("INSERT INTO contacts (name, phone, savedname, userID) "+
    "VALUES ( ?, ? , ? );",
    [ name, phone, savedname, userID ],
function(err) {
if (err) return console.log(err.message);
});
}
exports.updateName=function(savedname,userid){
    db.run("update contacts set savedname=? where id = ?",[savedname,userid],(err)=>{
        if (err) return console.log(err.message);
        
    });
}
exports.delete=function(id){
    db.run("delete from contacts where id=?",[id],(err)=>{
        if (err) return console.log(err.message);
        
    });
}
exports.contacts=function(userid,cb){
    db.all("select * from contacts where userID=?",[userid],(err,row)=>{
        if (err) return console.log(err.message);
        return cb(row);
        
    });
}

/*var test=(userid,cb)=>{db.all("select * from contacts where userID=?",[userid],(err,row)=>{
    if (err) return console.log(err.message);
    return cb(row);
    
    
});
}
test (5,(result)=>{
    var newbar=result;
    console.log(newbar[0]);
})*/