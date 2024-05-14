import mongoose, { Schema } from "mongoose";
import jwt from "json-web-token";
import bcrypt from "bcrypt";
import { useActionData } from "react-router-dom";


const userSchema =  new Schema(
    {
        username:{
            type: String,
            required: true,
            unique:true,
            lowercase: true,
            trim: true,
            index: true
        },

        email:{
            type: String,
            required: true,
            unique:true,
            lowercase: true,
            trim: true,
    },
    Fullname:{
        type: String,
        required: true,
        unique:false,
        lowercase: true,
        trim: true,
        index:true
    },
    avatar:{ //cloudenary
        type: String,
        required: true
    },   
    coverImage:{ //cloudenary
        type: String,
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref:"video"
        }
    ],
    password:{
        type:String,
        required:[true,'password is required!']
    },
    refreshToken:{
        type: String
    }

},
{
     timestamps: true
}

)

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password ,10)
    next()
})

userSchema.methods.isPasswordCorrect = async function
(password){
   return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
   return jwt.sign(
    {
        _id: this._id,
        email: this.email,
        username: this.username,
        Fullname:this.Fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )      
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
        )
}

export const User = mongoose.model("User", userSchema)