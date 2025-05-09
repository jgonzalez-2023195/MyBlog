import { Schema, model } from "mongoose";

const publicationSchema = new Schema(
    {
        title: {
            type: String,
            default: ' '
        },
        text: {
            type: String,
            default: ' '
        },
        mediaPicture: {
            type: String,
            default: null
        },
        userPublication: {
            type: String,
        },
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        },
        hashtags: [{
            type: String
        }]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model('Publication', publicationSchema);