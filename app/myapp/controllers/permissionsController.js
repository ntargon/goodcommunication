'use strict';

module.exports = {
    checkLogin: (req, res, next) => {
        if(res.locals.loggedIn){
            next();
        }else{
            res.redirect('/login');
        }
    },
    checkAdmin: (req, res, next) => {
        if(res.locals.loggedIn && res.locals.currentUser.roll === "admin"){
            next();
        }else{
            next(new Error("Permission denied."));
        }
    }
}



