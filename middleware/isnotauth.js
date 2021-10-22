module.exports = (req, res, next) => {
    if (req.session.isAuth==false) {
      next();
    } 
    else 
    {
        res.redirect('/userpage');
    }
  };