const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username:{
        type:String,
        require:true,
        min:3
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
        unique:true,
        select:false
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});

const userModel = mongoose.model("User",userSchema);

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id},process.env.JWT_SECRET);
    return token; 
}

module.exports=userModel;