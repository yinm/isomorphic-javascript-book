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

server.state('some-cookie', {
  ttl: null,
  isSecure: true,
  isHttpOnly: true,
  encoding: 'base64json',
  clearInvalid: false, // remove invalid cookies
  strictHeader: true // don't allow violations of RFC 6265
})

server.route({
  method: 'GET',
  path: '/',
  handler(req, res) {
    res.state('some-cookie', {someValue: false})
    res('Hello\n')
  }
})

server.start()
