import { Schema, model } from 'mongoose';

const commentSchema = new Schema(
    {
        text: {
            type: String,
        },
        user: {
            type: String
        },
        publication: {
            type: Schema.Types.ObjectId,
            ref: 'Publication',
        },
        parentComment: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
            default: null
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model('Comment', commentSchema);