import React, { useCallback, useEffect, useState } from 'react'
import { getCommentsRequest } from '../routers/services/App'
import { io } from 'socket.io-client'
import toast from 'react-hot-toast'

const socket = io('http://localhost:4003')

export const useComments = (publicationId) => {
    const [getComments, setGetComments] = React.useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const comment = useCallback(async ()=> {
        setIsLoading(true)
        const response = await getCommentsRequest(publicationId)
        setIsLoading(false)

        if(response.error){
            setError(true)
            if(response?.e?.response?.data?.errors){
                let arrayErrors = response?.e?.response?.data?.errors
                for(const error of arrayErrors){
                    return toast.error(error.msg)
                }
            }
            return toast.error(
                response?.e?.response?.data?.msg ||
                response?.e?.data?.msg ||
                'Error al intentar obtener los datos'
            )
        }
        setError(false);
        setGetComments(
        (response?.data?.comment || []).map(comment => ({
            ...comment,
            likes: { count: 0, userAction: false },
            dislikes: { count: 0, userAction: false },
        }))
        );
    }, [publicationId]);

    useEffect(() => {
        comment();

        socket.on('newComment', (newComment) => {
        setGetComments((prevComments) => [{
            ...newComment,
            likes: { count: 0, userAction: false },
            dislikes: { count: 0, userAction: false },
        }, ...prevComments]);
        });

        return () => {
        socket.off('newComment');
        };
    }, [comment]);
    return {
        getComments,
        isLoading,
        error,
        setError
    }
}
