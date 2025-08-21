import { FastifyInstance } from 'fastify'
import { create } from './create.ts'
import { list } from './list.ts'
import { getDetails } from './get-details.ts'
import { update } from './update.ts'
import { remove } from './delete.ts'

export async function salesRoutes(app: FastifyInstance) {
  app.post('/sales', create)
  app.get('/sales', list)
  app.get('/sales/:saleId', getDetails)
  app.put('/sales/:saleId', update)
  app.delete('/sales/:saleId', remove)
}
