const passport=require('passport');
const localStrategy=require('passport-local').Strategy;
const User=require('../models/user');

passport.use(new localStrategy({
    usernameField:'email',
    passReqToCallback:true},
    function(req,email,password,done){
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error',"Error in finding the user");
            return done(err);}
            if(!user)
            {
                req.flash('error','Invalid user');
                return done(null,false);
            }
            if(user.password!=password)
            {
                req.flash('error','Invalid password');
                return done(null,false);
            }
            return done(null,user);
        });
    }
));

passport.serializeUser(function(user,done){
    done(null,user.id);
});

passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err)
        {
            console.log(err);
            return done(err);
        }
        return done(null,user);
    });
});

passport.checkAuthentication=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        return next();
    }
    return res.redirect('/user/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next)
{
    if(req.isAuthenticated())
    {
        res.locals.user=req.user;
    }
    next();
}
module.exports=passport;