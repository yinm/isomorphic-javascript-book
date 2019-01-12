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
  handler(req, reply) {
    console.log(req.state['some-cookie'])
    reply('Hello\n')
  }
})

server.start()
