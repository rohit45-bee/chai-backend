import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from  "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { response } from "express";

const  registerUser  = asyncHandler( async(req, res) => {
    
    const {Fullname,email,username,password} = req.body
    console.log("email" ,email);

    if(
        [Fullname,email,username,password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400,"all fields are required")
    }

    const existedUser = User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser){
        throw new ApiError(409, "user with email with username already exist")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;


    if (!avatarLocalPath) {
        throw new ApiError(400 ,"Avatar file is required")
    }

    const avatar = await  uploadOnCloudinary(avatarLocalPath) 
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        throw new ApiError(400 ,"Avatar file is required")
    }

    const user = await User.create(
        {
            Fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username:username.toLowerCase()
        })

        const createdUser =await Use.findById(user._id).select(
            "-password -refre"
        )


        if (!createdUser) {
            throw new ApiError(500,"something went wrong while regidtering the user")
            
        }


        return res.status(201).jso(
            new ApiError(200, createdUser , "User registered succesfully")
        )
    
} )


export {
    registerUser,
}
