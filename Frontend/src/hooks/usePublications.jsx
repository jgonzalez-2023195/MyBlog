import { useState, useEffect, useCallback } from "react";
import { getPublications } from "../routers/services/App";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const usePublications = ()=> {
    const [publications, setPublications] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    
    useEffect(() => {
        const socket = io('http://localhost:4003')
        socket.on('message', (data) => {
            console.log('Nueva publicación recibida:', data);
            setPublications((prevPublications) => [data, ...prevPublications]);
            toast.success('Nueva publicación recibida');
        });

    }, []);

    const publication = useCallback(async ()=> {
        setIsLoading(true)
        const response = await getPublications()
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
        setError(false)
        setPublications(response?.data?.publications || []);
        toast.success('Publicaciones cargadas inicialmente')
    }, []) // Array de dependencias vacío

    useEffect(()=> {
        publication()
    }, [publication])

    return {
        publications,
        isLoading,
        error,
        setError
    }
}