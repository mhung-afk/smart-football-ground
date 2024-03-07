import mongoose from "mongoose"
const { Schema } = mongoose

const UserSchema = new Schema(
    {
        name: {
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
            required: true,
        },
        phone: {
            type: String,
            unique: true,
            required: true
        },
        avatar: {
            type: String,
            default: null
        },
        user_type: {
            type: String,
            enum: ['customer', 'manager', 'admin'],
            default: 'customer'
        }
    },
    { timestamps: true }
)

export default mongoose.model('users', UserSchema)
