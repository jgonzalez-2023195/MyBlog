import { Router } from "express"
import { deleteCourse, listCourse, newCourse, updateCourse } from './course.controller.js'
import { registerCourse, updateCoure } from '../../middlewares/validator.js'

const api = Router()

api.post(
    '/new',
    [
        registerCourse
    ],
    newCourse
)

api.get(
    '/list',
    listCourse
)

api.put(
    '/update/:id',
    [
        updateCoure
    ],
    updateCourse
)

api.delete(
    '/deleted/:id',
    deleteCourse
)

export default api