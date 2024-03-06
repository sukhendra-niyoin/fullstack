import mongoose, { Schema } from "mongoose";
import jwt from 'jsonwebtoken';

import bcrypt from 'bcryptjs'; //this package used for making password bycrypt in hash format

const userSchema = new Schema(
    {
        username: {
            type: String,     // Data type of username is string
            required: true,   // It is required. Without it, MongoDB won't save a username
            lowercase: true,  // Username is always converted to lowercase
            unique: true,     // Username is case-sensitive and must be unique
            trim: true,       // Removes extra white spaces from the username
            index: true       // Creates an index for the field to make searches faster
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary url string
            required: true,
        },
        coverImage: {
            type: String //cloudinary url in string
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId, //getting type from video model
                ref: "Video" //refrence of video model
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"], // here we pass array in required filed if reqired file is not available then second element of array is displayed
        },
        refreshToken: {
            type: String
        }
    }, { timestamps: true }


);

//here we using normal javascript function place of arrow function and reason of using this beacuse in arrow function we dont have this keyword and here we want a all userSchema property access that's why using normal function becuase in normal function we have a access of all the userSchema values using this keyword
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    //here we can encypting our password using bcrypt package using hash method and on password we applying 10 rounds of hashing for encypting it
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


//here we comparing our database password to user input password and that bcrypt method have a power to compare it
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// for generating access token 
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}
// for generating refresh token 
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

//exporting userSchema that name is User when we exporting 
export const User = mongoose.model("User", userSchema);


// async version of upper code 
/*
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    // We are encrypting our password using bcrypt package's hash method. We use 10 rounds of hashing for encryption.
    try {
        this.password = await bcrypt.hash(this.password, 10);
        next();
    } catch (error) {
        next(error); // Pass any error that occurs to the next middleware or error handler
    }
});
*/