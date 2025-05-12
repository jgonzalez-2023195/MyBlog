// src/controllers/course.controller.js
import Course from "../src/courses/course.model.js"

export const initCourses = async (req, res) => {
    try {
        // Lista de cursos predeterminados
        const defaultCourses = [
            {
                name: 'Taller III',
                description: 'Curso de Taller para el desarrollo de software en Kinal',
            },
            {
                name: 'Tecnología III',
                description: 'Curso de Tecnología para la teoría en el desarrollo de software en Kinal',
            },
            {
                name: 'Practica Supervisada',
                description: 'Curso de Practica Supervisada en Kinal',
            },
        ]

        const existingCourses = await Course.find({
            name: { $in: defaultCourses.map((course) => course.name) },
        })

        const existingCourseNames = existingCourses.map((course) => course.name)

        const coursesToCreate = defaultCourses.filter(
            (course) => !existingCourseNames.includes(course.name)
        )


        await Course.insertMany(coursesToCreate)
        console.log('Cursos inicializados correctamente')
    } catch (e) {
        console.error('Error al inicializar los cursos:', e)
        
    }
}