import Hapi from 'hapi'

const server = new Hapi.Server({
  debug: {
    request: ['error']
  }
})
server.connection({
  host: 'localhost',
  port: 8080
})

server.route({
  method: 'GET',
  path: '/',
  handler(request, reply) {
    reply.redirect('http://theoatmeal.com/')
  }
})

server.start()
