import { useState, useEffect, useCallback } from "react";
import { getPublicationsRequest } from "../routers/services/App";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const socket = io('http://localhost:4003')

export const usePublications = ()=> {
    const [publications, setPublications] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    

    const publication = useCallback(async ()=> {
        setIsLoading(true)
        const response = await getPublicationsRequest()
        setIsLoading(false)

        if(response.error){
            setError(true)
            if(response?.e?.response?.data?.errors){
                let arrayErrors = response?.e?.response?.data?.errors
                for(const error of arrayErrors){
                    return toast.error(error.msg)
                }
            }

            if(response?.data?.publications || [] < 1){
                toast.error('No hay publicaciones creadas')
            }
            return toast.error(
                response?.e?.response?.data?.msg ||
                response?.e?.data?.msg ||
                'Error al intentar obtener los datos'
            )
        }
        setError(false)
        setPublications(response?.data?.publications || [])
    }, []) // Array de dependencias vacío

    useEffect(() => {
        publication();

        // Listen for new publication events
        socket.on('newPublication', (newPub) => {
            setPublications((prevPublications) => [newPub, ...prevPublications]);
            toast.success('Nueva publicación recibida en tiempo real');
        });

        // Cleanup socket listener on unmount
        return () => {
            socket.off('newPublication');
        };
    }, [publication]);

    

    const fetchPublications = useCallback(async (filters) => {
        setIsLoading(true);
        const response = await getPublicationsRequest(filters);
        setIsLoading(false);

        if (response.error) {
            setError(true);
            if (response?.e?.response?.data?.errors) {
                let arrayErrors = response?.e?.response?.data?.errors;
                for (const error of arrayErrors) {
                    return toast.error(error.msg);
                }
            }
            return toast.error(
                response?.e?.response?.data?.msg ||
                response?.e?.data?.msg ||
                'Error al intentar obtener los datos'
            );
        }
        setError(false);
        setPublications(response?.data?.publications || []);
    }, []);

    return {
        publications,
        isLoading,
        error,
        setError,
        fetchPublications
    }
}