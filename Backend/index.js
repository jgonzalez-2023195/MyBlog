import { initServer } from './configs/app.js'
import { initCourses } from './configs/initConfigs.js'
import { config } from 'dotenv'
import { connect } from './configs/mongo.js'

config()
connect()
initCourses()
initServer()