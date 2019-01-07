import Hapi from 'hapi'
import nunjucks from 'nunjucks'

nunjucks.configure('./dist')

const server = Hapi.server({
  host: 'localhost',
  port: 8000
})

function getName(request) {
  let name = {
    fname: 'Rick',
    lname: 'Sanchez'
  }

  let nameParts = request.params.name ? request.params.name.split('/') : []

  name.fname = (nameParts[0] || request.query.fname) || name.fname
  name.lname = (nameParts[1] || request.query.lname) || name.lname
  return name
}

server.route({
  method: 'GET',
  path: '/hello/{name*}',
  handler(request, h) {
    return nunjucks.render('index.html', getName(request))
  }
})

server.start()
