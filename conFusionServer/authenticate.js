var passport=require('passport');
var localstrategy=require('passport-local').Strategy;
var User=require('./models/user');


exports.local=passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
