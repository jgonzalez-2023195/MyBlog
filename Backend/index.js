import { initServer } from './configs/app.js'
import { initCourses, initPublications } from './configs/initConfigs.js'
import { config } from 'dotenv'
import { connect } from './configs/mongo.js'

config()
connect()
initCourses()
initPublications()
initServer()