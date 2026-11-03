const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose").default;
const userSchema = new mongoose.Schema({
    // username
    // password 
    // email 
    // role
    email:{
        type:String,
        required:true,
        trim:true
    },
    role:{
        type:String,
        required:true,
        trim:true
    },
    cart:[
        {
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'Products'//moddle name where need to find the data
            },
            quantity:{
                type:Number,
                default:1
            }
             
        }
    ],
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model("User",userSchema);

module.exports = User;