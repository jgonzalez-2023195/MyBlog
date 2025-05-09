import { useState, useEffect, useRef, useCallback } from "react";
import { getPublications } from "../routers/services/App";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

export const usePublications = ()=> {
    const [publications, setPublications] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const socket = useRef(null);

    useEffect(() => {
        if (!socket.current) {
            socket.current = io('http://localhost:4003');
        }

        socket.current.on('connect', () => {
            console.log('Conectado al servidor Socket.IO para eventos.');
        });

        socket.current.on('disconnect', () => {
            console.log('Desconectado del servidor Socket.IO para eventos.');
        });

        socket.current.on('new_event', (newEvent) => {
            setPublications(prevEvents => [newEvent, ...prevEvents]);
            toast.success('¡Nuevo evento recibido en tiempo real!');
        });

        socket.current.on('event_updated', (updatedEvent) => {
            setPublications(prevEvents =>
                prevEvents.map(event => (event.id === updatedEvent.id ? updatedEvent : event))
            );
            toast.success(`Evento "${updatedEvent.title}" actualizado en tiempo real.`);
        });

        socket.current.on('event_deleted', (eventId) => {
            setPublications(prevEvents => prevEvents.filter(event => event.id !== eventId));
            toast.success('Evento eliminado en tiempo real.');
        });

        socket.current.on('connect_error', (error) => {
            console.error('Error de conexión Socket.IO:', error);
            toast.error('Error al conectar con el servidor en tiempo real.');
            setError(true);
        });

        return () => {
            if (socket.current) {
                socket.current.off('connect');
                socket.current.off('disconnect');
                socket.current.off('new_event');
                socket.current.off('event_updated');
                socket.current.off('event_deleted');
                socket.current.off('connect_error');
                socket.current.disconnect();
            }
        };
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