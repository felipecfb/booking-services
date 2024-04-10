import fastify from 'fastify'
import { env } from '../env'

const { PORT } = env

const app = fastify()

app.get('/', () => {
  return 'Hello World!'
})

app
  .listen({
    port: PORT,
    host: '0.0.0.0',
  })
  .then(() => {
    console.log('🔥 HTTP server running!')
  })
