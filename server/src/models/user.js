import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Name must be required!']
    },
    email: {
        type: String,
        required: [ true, 'Email must be required!']
    },
    gender: {
        type: String,
        enum: ['male','female','other']
    },
    password: {
        type: String,
        required: [ true, 'Password must be required!']
    },
    phone: {
        type: String,
        match: /[0-9]{10}/
    },
    profile_pic: String,
    status: {
        type: String,
        enum: ['pending','active','deActive'],
        default: 'pending'
    }
}, {timestamps: true}
)

const User = mongoose.model('user',userSchema)

export default User