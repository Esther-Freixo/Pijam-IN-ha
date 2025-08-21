import { FastifyInstance } from 'fastify'
import { verifyJWT } from '../../middlewares/verify-jwt.ts'
import { create } from './create.ts'
import { getDetails } from './get-details.ts'
import { list } from './list.ts'
import { updateStock } from './update.ts'
import { remove } from './delete.ts'

export async function pijamaRoutes(app: FastifyInstance) {
  app.get('/pijama', list)
  app.get('/pijama/:pijamaId', getDetails)
  app.post('/pijama', { onRequest: [verifyJWT] }, create)
  app.patch('/pijama/:pijamaId/stock', { onRequest: [verifyJWT] }, updateStock)
  app.delete('/pijama/:pijamaId', { onRequest: [verifyJWT] }, remove)
}
