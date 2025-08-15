import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'PLease add your name'],
        },
        email: {
            type: String,
            required: [true, 'Please add your email'],
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please add a valid email'
            ]
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
            minlength: 6,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model('User', userSchema);