import Publication from './publication.model.js'
import Comment from '../comment/comment.model.js'

export const addPublication = async(req, res)=> {
    try {
        let data = req.body
        let publication = new Publication(data)
        publication.mediaPicture = req.file?.filename??null
        await publication.save()


        return res.status(200).send(
            {
                success: true,
                message: 'Publication post',
                publication
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when add Publication for system',
                e
            }
        )
    }
}


export const listPublications = async(req, res)=> {
    try {
        let publications = await Publication.find().populate(
            {
                path: 'course',
                select: 'name -_id'
            }
        )

        if(publications.length===0) return res.status(404).send(
            {
                success: false,
                message: 'Not publications for system'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Publications: ',
                publications
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error cannot see publications in the system',
                e
            }
        )
    }
}


export const updatePublication = async(req, res)=> {
    const data = req.body
    try {
        let id = req.params.id
        const filename = req.file?.filename??null
        if(filename){
            data.mediaPicture = filename
        }
        const updatePublication = await Publication.findByIdAndUpdate(id, data, {new: true})
        if(!updatePublication) return res.status(404).send(
            {
                message: 'Publication not updated'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Updated publication',
                updatePublication 
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when updated publications',
                e
            }
        )
    }
}

export const deletePublication = async(req, res)=> {
    try {
        let id = req.params.id
        await Comment.deleteMany({publication: id})
        let deletePublication = await Publication.findByIdAndDelete(id)
        if(!deletePublication) return res.status(404).send(
            {
                success: false,
                message: 'Publication not found, publication not delete'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Publication deleted on system',
                deletePublication
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleted publications',
                e
            }
        )
    }
}