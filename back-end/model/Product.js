import mongoose from "mongoose"
const { Schema } = mongoose

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        ward: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: null
        },
        slot: [
            {
                timeStart: { type: String },
                timeEnd: { type: String },
                price: { type: Number },
                _id: false
            }
        ]
    }
)

export default mongoose.model('products', ProductSchema)