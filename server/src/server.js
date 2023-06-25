import 'express-async-errors'
import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './models/conn.js'
import userRouter from './routers/user.js'
import adminRouter from './routers/admin.js'
import errorMiddleware from './middleware/error.js'
import notFound from './middleware/notFound.js'

dotenv.config()


const server = express()
server.set('view engine', 'ejs')
server.use('/',express.static('src/public'))
server.use(express.json())
server.use(cors())
server.use('/api/user',userRouter)
server.use('/admin',adminRouter)
server.use(errorMiddleware)
server.use(notFound)

const startServer = async () => {

    try {
        const PORT = process.env.PORT || 5000
        const response = await connectDB( process.env.MONGO_URL,'webOConnect')
        console.log(`Mongo Connection with: ${response.connection.host}`)
        server.listen(PORT, console.log(`Server is running on ${PORT}`))
    } catch (err) {
        console.log(`Mongo Connection Error: ${err}`)
    }
}

startServer()