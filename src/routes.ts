import { Router } from 'express'

import { AuthenticateClientController } from './modules/account/authenticateClient/AuthenticateClientController'
import { AuthenticateDeliverymanController } from './modules/account/authenticateDeliveryman/AuthenticateDeliverymanController'
import { CreateClientController } from './modules/clients/useCasses/createClient/CreateClientController'
import { CreateDeliverymanController } from './modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController'
import { CreateDeliveryController } from './modules/deliveries/useCases/createDelivery/CreateDeliveryController'
import { FindAllAvailableController } from './modules/deliveries/useCases/findAllAvailable/FindAllAvailableController'
import { UpdateDeliverymanController } from './modules/deliveries/useCases/updateDeliveryman/useCases/UpdateDeliverymanController'
import { FindAllDeliveriesController } from './modules/clients/useCasses/deliveries/FindAllDeliveriesController'
import { FindAllDeliveriesDeliverymanController } from './modules/deliveryman/useCases/findAllDeliveries/FindAllDeliveriesDeliverymanController'

import { ensureAuthenticateClient } from './middlewares/ensureAuthenticateClient'
import { ensureAuthenticateDeliveryman } from './middlewares/ensureAuthenticateDeliveryman'
import { UpdateEndDateController } from './modules/deliveries/useCases/updateEndDate/UpdateEndDateController'

export const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController()
const createDeliverymanController = new CreateDeliverymanController()
const createDeliveryController = new CreateDeliveryController()
const findAllAvailableController = new FindAllAvailableController()
const findAllDeliveriesController = new FindAllDeliveriesController()
const updateDeliverymanController = new UpdateDeliverymanController()
const updateEndDateController = new UpdateEndDateController()
const findAllDeliveriesDeliverymanController =
  new FindAllDeliveriesDeliverymanController()

routes.post('/client', createClientController.handle)

routes.post('/client/authenticate', authenticateClientController.handle)
routes.post(
  '/deliveryman/authenticate',
  authenticateDeliverymanController.handle,
)

routes.post('/deliveryman', createDeliverymanController.handle)

routes.post(
  '/delivery',
  ensureAuthenticateClient,
  createDeliveryController.handle,
)
routes.get(
  '/delivery/available',
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle,
)

routes.put(
  '/delivery/updateDeliveryman/:id',
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle,
)

routes.get(
  '/client/deliveries',
  ensureAuthenticateClient,
  findAllDeliveriesController.handle,
)

routes.get(
  '/deliveryman/deliveries',
  ensureAuthenticateDeliveryman,
  findAllDeliveriesDeliverymanController.handle,
)

routes.put(
  '/delivery/updateEndDate/:id',
  ensureAuthenticateDeliveryman,
  updateEndDateController.handle,
)
