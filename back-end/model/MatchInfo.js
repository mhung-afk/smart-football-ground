import mongoose from "mongoose"
const { Schema } = mongoose

const MatchInfoSchema = new Schema(
    {
        result: {
            type: [
                {
                    team: { type: String },
                    point: { type: Number }
                },
                {
                    team: { type: String },
                    point: { type: Number }
                }
            ],
            default: [{ team: 'A' }, { team: 'B' }]
        },
        temperature: {
            type: Number,
            required: true,
            default: 0
        },
        humidity: {
            type: Number,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

export default mongoose.model('match_info', MatchInfoSchema)