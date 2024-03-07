import mongoose from "mongoose"
const { Schema } = mongoose

const SharingMatchInfoSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        matchs: [
            {
                type: Schema.Types.ObjectId,
                ref: "match_info"
            }
        ]
    },
    {
        timestamps: true
    }
)

export default mongoose.model('sharing_match_info', SharingMatchInfoSchema)