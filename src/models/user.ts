import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
const saltRounds = 10;
var schema = mongoose.Schema

const user = new schema({
    email: {type:String,require:true},
    password: {type:String, require:true, unique:true}
})


//converting password to encrypt
user.pre('save', function(next:any) {
    const user:any = this
    bcrypt.hash(user.password,saltRounds, function(err:any, hash:any) {
        user.password = hash
        if(!user.password) console.log(err);
        next();
    });
    
  });

  module.exports = mongoose.model("UserModel",user)
