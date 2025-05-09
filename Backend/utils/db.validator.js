import Category from '../src/courses/course.model.js'
import { isValidObjectId } from 'mongoose'

export const existNameCourse = async(name, category)=> {
    const alreadyName = await Category.findOne({name})
        if(alreadyName && alreadyName._id != category._id){
            console.error(`Name ${name} is already taken`);
            throw new Error(`Name ${name} is already taken`)
        }
}

export const objectIdValid = async(objectId)=> {
    if(!isValidObjectId(objectId)) throw new Error('Is not valid ObjectId')
}