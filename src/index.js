import Hapi from 'hapi'
import nunjucks from 'nunjucks'
import Application from './lib'

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

const application = new Application({
  '/': (request, h) => {
    return nunjucks.render('index.html', getName(request))
  }
}, {
  server: server
})

application.start()
