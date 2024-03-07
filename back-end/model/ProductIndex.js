import mongoose from "mongoose"
const { Schema } = mongoose

const ProductIndexSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        led: {
            type: Boolean,
            default: false,
            required: true
        },
        ledAutomatic: {
            type: Boolean,
            default: false,
            required: true
        },
        pump: {
            type: Boolean,
            default: false,
            required: true
        },
        pumpAutomatic: {
            type: Boolean,
            default: false,
            required: true
        },
        door: {
            type: String,
            default: '12345',
            required: true
        },
        airHumidity: {
            type: Number,
            default: 30,
            required: true
        },
        airTemperature: {
            type: Number,
            default: 30,
            required: true
        },
        soilMoisture: {
            type: Number,
            default: 30,
            required: true,
        }
    },
    { timestamps: true }
)

export default mongoose.model('product_index', ProductIndexSchema)