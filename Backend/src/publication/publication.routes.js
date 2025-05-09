import { Router } from "express"
import { addPublication, deletePublication, listPublications, updatePublication } from './publication.controller.js'
import { newPublication, updatPublication } from '../../middlewares/validator.js'
import { deleteFileOnError } from '../../middlewares/delete.file.errors.js'
import { uploadPublicationMedia } from '../../middlewares/multer.uploads.js'

const api = Router()

api.post(
    '/new',
    [
        uploadPublicationMedia.single('mediaPicture'),
        newPublication,
        deleteFileOnError
    ],
    addPublication
)

api.get(
    '/list',
    listPublications
)

api.put(
    '/update/:id',
    [
        uploadPublicationMedia.single('mediaPicture'),
        updatPublication,
        deleteFileOnError
    ],
    updatePublication
)

api.delete(
    '/deleted/:id',
    deletePublication
)

export default api 