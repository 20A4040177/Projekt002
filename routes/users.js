const { json } = require('express');
const user=require('../models/users');
const contacts=require('../models/contacts')

exports.getUserPage = function(req, res) {
  user.getFullInfo(req.session.username,(result)=>{
    var data=result;
    contacts.contacts(data.id,(result)=>{
      var contacts=result;
      res.render('userpage', {paneltitle:'User Information',
      data:data,status1:"active", status2: "", status3: "",contacts:contacts})

    })
    
     
  })

  
}
exports.register=(req,res,next)=>{
  res.render('register',{error:""})

}
exports.login=(req,res)=>
{
  if(req.body.phonenumber&&req.body.password)
  {
    user.checkUser(req.body.phonenumber,req.body.password,(result)=>{
      if (result!=undefined)
      {
        req.session.isAuth = true;
        req.session.username = req.body.phonenumber;
        res.redirect('/userpage');
      }
      else res.render('index',{error:"Invalid login credentials"})
    })

  }
  else res.render('index',{error:"Please enter your phone number and password"})

}
exports.deletecontact=(req,res)=>{
  contacts.delete(req.body.contactid);
  res.redirect('/userpage');
}
exports.editcontact=(req,res)=>{
  contacts.updateName(req.body.name,req.body.contactid);
  res.redirect('/userpage');
}
exports.register_post=(req,res,next)=>{
  if(req.body.phonenumber&&req.body.password&&req.body.name)
  {
    var isUsed=0;
    user.readPhonenumber(req.body.phonenumber,(result)=>{
    if (result!=undefined)
    isUsed=1;
    if(isUsed==0)
      {
        user.create(req.body.name,req.body.password,req.body.phonenumber);
        res.render('accountcreated');
      }
    else {
      res.render('register',{error:"An account has been registered with this phone number"})
    }
    })
    
    


  }
  else res.render('register',{error:"Please fill in the neccessary fields"})
}
exports.logout=(req,res)=>{req.session.destroy((err) => {
  if (err) throw err;
  res.redirect("/");
});
}
/*user.getFullInfo('0123456788',(result)=>{
  var data=result;
  console.log(result.phone);

  //res.render('userpage', {data:data,status1:"active", status2: "", status3: ""})
   
})*/