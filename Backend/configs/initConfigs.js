// src/controllers/course.controller.js
import Course from "../src/courses/course.model.js"
import Publication from "../src/publication/publication.model.js"

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

export const initPublications = async(req, res) => {
    try {
        // Lista de publicaciones predeterminadas
        const defaultPublications = [
            {
                userPublication: 'José González - 2023195',
                title: 'Publicación 1',
                text: 'Publicacion de prueba 1',
                mediaPicture: 'https://res.cloudinary.com/dzydnoljd/image/upload/v1747115147/mihmziunjquajpkmxizd.jpg',
                hashtags: ['#Blog_Kinal']
            },
        ]

        const existingPublications = await Publication.find({
            title: { $in: defaultPublications.map((publication) => publication.title) },
        })
        const publicationToCreate = defaultPublications.filter(
            (publication) => !existingPublications.some((existingPublication) => existingPublication.title === publication.title)
        )
        await Publication.insertMany(publicationToCreate)
        console.log('Publicaciones inicializadas correctamente')
    } catch (e) {
        console.error('Error al inicializar las publicaciones:', e)
        
    }
}