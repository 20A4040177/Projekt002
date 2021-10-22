const user=require('../models/users');
const contacts=require('../models/contacts');
const transactions  = require('../models/transactions');

exports.view= (req,res,next)=>{
    user.getFullInfo(req.session.username,(result)=>{
        var data=result;
        contacts.contacts(data.id,(result)=>{
            var contacts=result;
            res.render('topup', {data:data,paneltitle:'Mobile Top up',status1:" ", 
            status2: "active", status3: " ",contacts:contacts});
        });
        
    
    })
}
exports.next= (req,res,next)=>{
    user.getFullInfo(req.session.username,(result)=>{
        var data=result;
    res.render('nextstep', {data:data,paneltitle:'Mobile Top up',status1:" ", status2: "active", status3: " ",rcpName:req.query.name,rcpPhone:req.query.phone});
    })
}
exports.confirm= (req,res,next)=>{
    user.getFullInfo(req.session.username,(result)=>{
        var data=result;
        var date = new Date();
    var dateStr =
    ("00" + (date.getMonth() + 1)).slice(-2) + "" +
    ("00" + date.getDate()).slice(-2) + "" +
    date.getFullYear() + "" +
    ("00" + date.getHours()).slice(-2) + "" +
    ("00" + date.getMinutes()).slice(-2) + "" +
    ("00" + date.getSeconds()).slice(-2);
        var transID=dateStr;
    res.render('confirm', {data:data,paneltitle:'Mobile Top up',status1:" ", status2: "active",
     status3: " ",value:req.query.value,
     total:req.query.total,cashback:req.query.cashback,usedpoints:req.query.usedpoints,transID:transID});
    })
}
exports.success=(req,res,next)=>{
    user.getFullInfo(req.session.username,(result)=>{
        var data=result;
    res.render('success', {data:data,paneltitle:'Mobile Top up',status1:" ", status2: "active", status3: " "});
    })
}
exports.check=(req,res,next)=>{
    user.checkBalance(req.body.userid,(result)=>
    {
        if (parseInt(result.balance)!=parseInt(req.body.balance)||parseInt(result.points)!=parseInt(req.body.points))
        {
            res.render('showerr',{error:"Incorrect data!"})
        }
        else if (parseInt(req.body.balance)<parseInt(req.body.total)||parseInt(req.body.usedpoints)>parseInt(result.points))
        {
            res.render('showerr',{error:"Insufficient funds!"})

        }
        else 
        {
            var todayDate = new Date().toISOString().slice(0, 10);
            var d = new Date();
            var timenow = d.toLocaleTimeString();
            user.updateBalance(req.body.userid,parseInt(req.body.balance)-parseInt(req.body.total),
                parseInt(req.body.points)+parseInt(req.body.cashback)-parseInt(req.body.usedpoints));
            transactions.create(req.body.transid,todayDate,timenow,parseInt(req.body.total),
                parseInt(req.body.cashback),'complete',req.body.phone,req.body.userid);
            
                user.getFullInfo(req.session.username,(result)=>{
                    var data=result;
                    transactions.transaction(req.body.transid,(result)=>{
                    var trans=result;
                res.render('success', {trans:trans,data:data,paneltitle:'Mobile Top up',status1:" ", status2: "active", status3: " "});
                })
                
            })
        }

    })
}