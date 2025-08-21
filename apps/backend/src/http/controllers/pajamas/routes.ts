import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt.ts'
import { create } from './create.ts'
import { getDetails } from './get-details.ts'
import { list } from './list.ts'
import { updateStock } from './update.ts'
import { remove } from './delete.ts'

export async function pijamaRoutes(app: FastifyInstance) {
  app.get('/pijamas', list)
  app.get('/pijamas/:pijamaId', getDetails)
  app.post('/pijamas', { onRequest: [verifyJWT] }, create)
  app.patch('/pijamas/:pijamaId/stock', { onRequest: [verifyJWT] }, updateStock)
  app.delete('/pijamas/:pijamaId', { onRequest: [verifyJWT] }, remove)
}
