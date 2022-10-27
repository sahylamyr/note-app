import express from 'express'
import dotenv from 'dotenv'
import connect from './db.js'
import noteRouter from './routes/noteRouter.js'
dotenv.config()
const app = express()

connect()




app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const port = process.env.PORT || 3000


app.listen(port, () => {

    /** Note Routes */
    app.use('/api/notes', noteRouter)

})