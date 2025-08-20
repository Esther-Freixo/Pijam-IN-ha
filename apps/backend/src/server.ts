import { app } from './app.ts';
import { env } from '../src/env/index.ts'

app.listen({
	host: "0.0.0.0",
	port: env.PORT,
	}).then(() => {
	console.log(`servidor está rodando na porta 3333`)
	}) 