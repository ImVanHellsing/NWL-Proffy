import express from 'express'
import cors from 'cors'

//Routes
import routes from './routes'

//Configuring the server
const app = express()

app.use(cors())
app.use(express.json())
app.use(routes)

app.listen(3333)