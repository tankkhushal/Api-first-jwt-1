const passport = require("passport")

const JStrategy = require('passport-jwt').Strategy;
const EJwt = require('passport-jwt').ExtractJwt;

var opts ={
    jwtFromRequest : EJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : 'rnw'

}
const singupmodel = require("../model/singupmodel")

passport.use(new JStrategy(opts, async function(payload, done){
let checkuserdata = await singupmodel.findOne({email: payload.userdata.email});
   if(checkuserdata){
        return done(null , checkuserdata)
    }
    else{
        return done(null , false)
    }
}));

passport.serializeUser(function(user,done){
    return done(null,user.id)
})

passport.deserializeUser(async function(id,done){
    let userdata = await singupmodel.findById(id);
    if(userdata){
        return done(null,userdata);
    }
    else{
        return done(null,false);
    }
})