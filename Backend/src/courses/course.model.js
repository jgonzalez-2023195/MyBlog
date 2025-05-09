import { Schema, model } from "mongoose"

const coursesSchema = Schema(
    {
        name:{
            type: String,
            unique: true
        },
        description: {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Course', coursesSchema)