import passport from 'passport';
import LocalStrategy from 'passport-local';//套用物件
import UserService from '../services/user';
import {Strategy as jwtStrategy, ExtractJwt} from 'passport-jwt';// 載入passwort-jwt這個物件改名為jwtStrategy
import truncate from 'lodash.truncate';

require('dotenv').config();
// jwt option
const options = {
    secretOrKey: process.env.APP_KEY,
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
}


passport.use(new LocalStrategy({
   usernameField: 'email',
},(async (email, password, cb)=>{
    const user = await UserService.getUser(email);
    if(!user){
        //第一個是傳直、第二個成功與否、三是flash message
        return cb({status: 400, message: '沒有該用戶' },false); 
    }
    return cb(null, user);
}
)));

passport.use(new jwtStrategy(options, (payload, cb)=>{
    //expireTime , id
    const status = calcExpireTime(payload);
    if(!status){
        return cb ({status: 400, message: 'Token 到期 請重新登入!'})
    }
    return cb (null,payload)
}))

//function
const calcExpireTime =(payload)=>{
    const {expireTime} = payload;
    const currentTime = new Date().getTime();

    if(currentTime > expireTime){
        return false;
    }
    return true;
}

export default passport;
