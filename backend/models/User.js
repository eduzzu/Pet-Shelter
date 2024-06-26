import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        
        isAdmin: {
            type: Boolean,
            default: false
        },
        requests: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Request',
            default: []
        }
    }, { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;