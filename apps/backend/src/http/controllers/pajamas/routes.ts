import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt.ts'
import { create } from './create.ts'
import { getDetails } from './get-details.ts'
import { list } from './list.ts'
import { updateStock } from './update.ts'
import { remove } from './delete.ts'

export async function pajamasRoutes(app: FastifyInstance) {
  app.get('/pajamas', list)
  app.get('/pajamas/:pajamaId', getDetails)
  app.post('/pajamas', { onRequest: [verifyJWT] }, create)
  app.patch('/pajamas/:pajamaId/stock', { onRequest: [verifyJWT] }, updateStock)
  app.delete('/pajamas/:pajamaId', { onRequest: [verifyJWT] }, remove)
}
