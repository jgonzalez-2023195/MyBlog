import React, { useCallback, useEffect, useState } from 'react'
import { getCourseRequest } from '../routers/services/App'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4003')

export const useCourse = () => {
    const [courses, setCourses] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const course =useCallback( async () => {
        setIsLoading(true)
        const response = await getCourseRequest()
        setIsLoading(false)

        if (response.error) {
            setError(true)
            if (response?.e?.response?.data?.errors) {
                let arrayErrors = response?.e?.response?.data?.errors
                for (const error of arrayErrors) {
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
        setCourses(response?.data?.course || []);
    }, [])

    useEffect(() => {
        course()

        socket.on('newCourse', (newCourse) => {
            setCourses((prevCourses) => [newCourse, ...prevCourses]);
            toast.success('Nuevo curso recibido en tiempo real');
        })

        return () => {
            socket.off('newCourse')
        }
    }, [course])

    return {
        courses,
        isLoading,
        error,
        setError
    }
}