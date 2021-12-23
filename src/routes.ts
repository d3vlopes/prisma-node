import { Router } from 'express'
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController'
import { CreateClientController } from './modules/clients/useCasses/createClient/CreateClientController'

export const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()

routes.post('/client', createClientController.handle)

routes.post('/authenticate', authenticateClientController.handle)
