import Comment from './comment.model.js'
import Publication from '../publication/publication.model.js'
import { Types } from 'mongoose'

export const commentToPublication = async(req, res)=> {
    try {
        let data = req.body
        let comment = new Comment(data)
        await comment.save()
        return res.status(200).send(
            {
                success: true,
                message: 'Add comment to publication',
                comment
            }
        )
    } catch (e) {
        console.error(e);
        //updateMany
        return res.status(500).send(
            {
                success: false,
                message: 'General error when add comment for system'
            }
        )
    }
}

export const listComment = async(req, res)=> {
    const id = req.params.id
    const { user } = req.query
    try {
        if(!Types.ObjectId.isValid(id)) return res.status(400).send(
            {
                success: false,
                message: 'Invalid ObjectId publication'
            }
        )

        const filter = { publication: id };
            if (user) {
            filter.user = user;
        }
        
        let comment = await Comment.find({publication: id}).sort({createdAt: -1})

        
        return res.status(200).send(
            {
                success: true,
                message: 'Comments found: ',
                comment
            }
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error cannot see comment in the system',
                e
            }
        )
    }
}

export const updatComment = async(req, res)=> {
    const data = req.body
    try {
        let id = req.params.id
        let updateComment = await Comment.findByIdAndUpdate(id, data, {new: true})
        if(!updateComment) return res.status(404).send(
            {
                success: false,
                message: 'Comment not found, comment not update'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Comment found, comment updated',
                updateComment
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when updated comment',
                e
            }
        )
    }
}

export const deletedComment = async(req, res)=> {
    try {
        let id = req.params.id
        let deleteComment = await Comment.findByIdAndDelete(id)
        if(!deleteComment) return res.status(404).send(
            {
                success: false,
                message: 'Comment not found, comment not deleted'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Comment found, comment deleted to system',
                deleteComment
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleted comment',
                e
            }
        )
    }
}