/**
 * Created by Administrator on 2015/8/19.
 */

var security = {
    login: function (req, res, next) {
        console.log("security.login")
        res.cookie('uname', req.session.user.userName, {maxAge: 60 * 60 * 1000});
        res.cookie('uid', req.session.user.id, {maxAge: 60 * 60 * 1000});
        next();
    }
}
module.exports = security;