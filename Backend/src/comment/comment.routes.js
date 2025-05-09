import { Router } from "express"
import { commentToPublication, deletedComment, listComment, updatComment } from './comment.controller.js'
import { newComment, updateComment } from '../../middlewares/validator.js'

const api = Router()

api.post(
    '/new',
    [
        newComment
    ],
    commentToPublication
)

api.get(
    '/list/',
    listComment
)

api.put(
    '/updated/:id',
    [
        updateComment
    ],
    updatComment
)

api.delete(
    '/deleted/:id',
    deletedComment
)

export default api