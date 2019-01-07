import Hapi from 'hapi'
import nunjucks from 'nunjucks'

nunjucks.configure('./dist')

const server = Hapi.server({
  host: 'localhost',
  port: 8000
})

server.route({
  method: 'GET',
  path: '/hello',
  handler(request, h) {
    return nunjucks.render('index.html', {
      fname: 'Rick',
      lname: 'Sanchez'
    })
  }
})

server.start()
