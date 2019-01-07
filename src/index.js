const Hapi = require('hapi')

const server = Hapi.server({
  host: 'localhost',
  port: 8000
})

server.route({
  method: 'GET',
  path: '/hello',
  handler(request, h) {
    return 'hello world'
  }
})

server.start()
