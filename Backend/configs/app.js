'user strict'

import express from 'express'
import helmet from 'helmet'
import cors from 'cors'
import morgan from 'morgan'
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import catRoutes from '../src/courses/course.routes.js'
import publicationRoutes from '../src/publication/publication.routes.js'
import commentRoutes from '../src/comment/comment.routes.js'

const configs =(app)=> {
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=> {
    app.use('/v1/blog/course', catRoutes)
    app.use('/v1/blog/publication', publicationRoutes)
    app.use('/v1/blog/comment', commentRoutes)
}

export const initServer = ()=> {
    const app = express()
    const server = createServer(app)
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    })

    io.on('connection', (socket) => {
        console.log('Cliente Socket.IO conectado:', socket.id);
  
        socket.on('message', (message) => {
          console.log(`Mensaje Socket.IO recibido de ${socket.id}: ${message}`);
  
          // Ejemplo: Reenviar el mensaje a todos los clientes
          io.emit('message', `Servidor dice (${socket.id}): ${message}`);
        });
  
        socket.on('disconnect', () => {
          console.log('Cliente Socket.IO desconectado:', socket.id);
        });
  
        socket.on('error', (error) => {
          console.error('Error en Socket.IO:', error);
        });
  
        socket.emit('welcome', '¡Bienvenido a Socket.IO desde el servidor!');
      });

    try {
        configs(app)
        routes(app)
        server.listen(process.env.PORT)
        console.log(`Server express and socket, running in port: ${process.env.PORT}`);
    } catch (e) {
        console.error('Server init failed: ', e);
    }
} 