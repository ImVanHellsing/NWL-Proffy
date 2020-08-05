import { Router } from 'express'

//Controllers
import ClassController from './controllers/ClassesController'
import ConnectionController from './controllers/ConnectionsController'

const classesController = new ClassController()
const connectionsController = new ConnectionController()

const routes = Router()

//Classes
routes.get('/classes', classesController.index)
routes.post('/classes', classesController.store)

//Connections
routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.store)

export default routes