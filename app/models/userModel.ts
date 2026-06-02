import mongoose from 'mongoose';
import { unique } from 'next/dist/build/utils';

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        unique: [true, 'Please provide a username'],
        type: String
    },
    email: {
        required: true,
        unique: [true, 'Please provide a email'],
        type: String
    },
    password: {
        required: true,
        type: String
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: {
        type: String
    },
    forgotPasswordTokenExpiry: {
        
        type: Date
    },
    verifyToken: {
        type: String
    },
    verifyTokenExpiry: {
        type: Date
    }
});

const User = mongoose.models.users || mongoose.model('users', userSchema);

export default User;
