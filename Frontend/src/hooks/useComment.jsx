import React, { useState } from 'react'
import { newCommentRequest } from '../routers/services/App'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4003')

export const useComment = () => {
    const [error, setError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const addcomments = async(data)=> {
        setIsLoading(true)
        const comment = {
            text: data?.text,
            user: data?.userComment,
            publication: data?.publication,
            ...(data?.parentComment && { parentComment: data.parentComment })
        }

        const response = await newCommentRequest(comment)
        setIsLoading(false)
        if(response.error){
            setError(true)
            if(response?.e?.response?.data?.errors){
                let arrayErros = response?.e?.response?.data?.errors
                for(const error of arrayErros) {
                    return toast.error(error.msg)
                }
            }
            return toast.error(
                response?.e?.response?.data?.msg ||
                response?.e?.data?.msg ||
                'Error al intentar commentar'
            )
        }
        setError(false)
        socket.emit('message', { ...comment })
        return toast.success('Comentario publicado')
    }
    return {
        addcomments,
        isLoading,
        error,
        setError
    }
}
