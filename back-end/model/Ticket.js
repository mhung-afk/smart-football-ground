import mongoose from "mongoose"
const { Schema } = mongoose

const TicketSchema = new Schema(
    {
        code: {
            type: String,
            required: true
        },
        timeStart: {
            type: String,
            required: true
        },
        dateStart: {
            type: Date,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        user_phone: {
            type: String,
            required: true
        },
        user_id: {
            type: Schema.Types.ObjectId,
            ref: 'users',
            required: true
        },
        match_info_id: {
            type: Schema.Types.ObjectId,
            ref: 'match_info',
            default: null
        },
        product_index_id: {
            type: Schema.Types.ObjectId,
            ref: "product_index",
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'canceled'],
            default: 'pending'
        }
    },
    { timestamps: true }
)

export default mongoose.model('tickets', TicketSchema)