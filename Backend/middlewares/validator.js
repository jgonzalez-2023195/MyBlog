import { body } from 'express-validator'
import { validateErrors } from './validate.errors.js'
import { existNameCourse, objectIdValid } from '../utils/db.validator.js'

export const registerCourse = [
    body('name')
        .notEmpty().withMessage('Name cannot be empty')
        .isLength({max: 20}).withMessage(`Can't be more than 20 characters`)
        .custom(existNameCourse),
    body('description')
        .notEmpty().withMessage('Description cannot be empty')
        .isLength({max: 50}).withMessage(`Can't be more than 50 characters`),
    validateErrors
]

export const updateCoure = [
    body('name')
        .optional()
        .notEmpty()
        .isLength({max: 20}).withMessage(`Can't be more than 20 characters`),
    body('description')
        .optional()
        .notEmpty()
        .isLength({max: 50}).withMessage(`Can't be more than 50 characters`),
    validateErrors
]   

export const newPublication = [
    body('title')
        .optional()
        .notEmpty().withMessage('Title cannot be empty')
        .isLength({min: 1}).withMessage('The title must be at last 1 character long'),
    body('text')
        .optional()
        .notEmpty().withMessage('Text cannot be empty'),
    body('userPublication')
        .notEmpty().withMessage('User publication cannot be empty'),
    body('course')
        .notEmpty().withMessage('Course cannot be empty')
        .custom(objectIdValid),
    validateErrors
]

export const updatPublication = [
    body('title')
        .optional()
        .notEmpty().withMessage('Title cannot be empty')
        .isLength({min: 1}).withMessage('The title must be at last 1 character long'),
    body('text')
        .optional()
        .notEmpty().withMessage('Text cannot be empty'),
    body('userPublication')
        .notEmpty().withMessage('User publication cannot be empty'),
    body('course')
        .optional()
        .notEmpty().withMessage('Course cannot be empty')
        .custom(objectIdValid),
    validateErrors
]

export const newComment = [
    body('text')
        .notEmpty().withMessage('Text cannot be empty'),
    body('publication')
        .notEmpty().withMessage('ObjectId publication cannot be empty')
        .custom(objectIdValid).withMessage('Not valid ObjectID'),
    body('parentComment')
        .optional()
        .custom(objectIdValid).withMessage('Not valid ObjectID'),
    validateErrors
]

export const updateComment = [
    body('text')
        .optional(),
    body('publication')
        .optional()
        .custom(objectIdValid).withMessage('Not valid ObjectID'),
    body('parentComment')
        .optional()
        .custom(objectIdValid).withMessage('Not valid ObjectID'),
    validateErrors
]