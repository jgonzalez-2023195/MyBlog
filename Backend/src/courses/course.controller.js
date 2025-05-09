import Course from './course.model.js'

export const newCourse = async(req, res)=> {
    const data = req.body
    try {
        let course = new Course(data)
        await course.save()
        return res.status(200).send(
            {
                success: true,
                message: 'Course successfully added to the system',
                course
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when add Course for system',
                e
            }
        )
    }
}

export const listCourse = async(req, res)=> {
    try {
        let course = await Course.find()
        if(course.lenth === 0) return res.status(404).send({message: 'courses not found'})
            return res.status(200).send(
                {
                    success: true,
                    message: 'courses found: ', course
                }
            )
    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error cannot see courses in the system',
                e
            }
        )
    }
}

export const updateCourse = async(req, res)=> {
    try {
        let id = req.params.id
        let data = req.body

        let course = await Course.findByIdAndUpdate(id, data, {new: true})
        if(!course) return res.status(404).send(
            {
                success: false,
                message: 'Course not found, Course not update'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Course updated succesfully',
                course
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when updated Course',
                e
            }
        )       
    }
}

export const deleteCourse = async(req, res)=> {
    try {
        let id = req.params.id
        let course = await Course.findByIdAndDelete(id)
        if(!course) return res.status(404).send(
            {
                success: false,
                message: 'Course not found, Course not delete'
            }
        )
        return res.status(200).send(
            {
                success: true,
                message: 'Course deleted to system',
                course
            }
        )
    } catch (e) {
        console.error(e);
        return res.status(500).send(
            {
                success: false,
                message: 'General error when deleted Course',
                e
            }
        )
    }
}