export class OutOfStockError extends Error {
  constructor() {
    super('Out of stock.')
  }
}
