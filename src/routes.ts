import { Router } from 'express'
import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController'
import { CreateClientController } from './modules/clients/useCasses/createClient/CreateClientController'
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'

export const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()

routes.post('/client', createClientController.handle)

routes.post('/authenticate', authenticateClientController.handle)

routes.post('/deliveryman', createDeliverymanController.handle)
