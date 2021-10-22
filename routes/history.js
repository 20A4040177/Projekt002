const user=require('../models/users');
const transact=require('../models/transactions')

exports.view= (req,res,next)=>{
    user.getFullInfo(req.session.username,(result)=>{
        var data=result;
        transact.transactions(data.id,(result)=>{
            var records=result;
            res.render('history', {records:records,data:data,paneltitle:'Transaction History',
            status1:"", status2: "", status3: "active"});
        })
    
    })
}