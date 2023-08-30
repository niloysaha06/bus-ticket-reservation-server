import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "Please provide your name."]
        },
        mobile_number: {
            type: String,
            require: [true, "Please provide your mobile number."]
        },
        email: {
            type: String,
            required: [true, "Please provide your email address"]
        },
        gender: {
            type: String,
            required: [true, "Please select your gender"]
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

export default User;
