const mongoose =require('mongoose')
const bcrypt = require('bcrypt');


const UserSchema = mongoose.Schema({
    email:{
        type: String,
        unique: true,
        required: true
    },
    /* 
    gender:{
        type: String,
        required: true
    },
    */
    password: {
        type: String,
        required: true,
    },
    /*
    role: {
        type: String,
        required: true,
        default: "user"
    }
    */
});
/**
 
UserSchema.methods.isAdmin = function() {
    if(user.role.equals(req.user.role) == true) {
        return true
      }
}
*/

UserSchema.pre('save',async function(next){
    if (this.isModified('password') || this.isNew){
        const hash = await bcrypt.hash(this.password, 10)
        this.password= hash
        next()
    }else {
        return next()
    }
});

UserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, isMatch)=>{
        if (err){
            return cb(err);
        }
        cb(null, isMatch)
    })
}


module.exports = mongoose.model('User', UserSchema)