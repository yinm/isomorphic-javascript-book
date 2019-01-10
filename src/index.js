import Hapi from 'hapi';
import Application from './lib'
import HelloController from './hello-controller'
import nunjucks from 'nunjucks'

nunjucks.configure('./dist', {autoescape: false})

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

const application = new Application({
  '/hello/{name*}': HelloController
}, {
  server: server,
  document: function (application, controller, request, reply, body, callback) {
    nunjucks.render('./index.html', { body: body }, (err, html) => {
      if (err) {
        return callback(err, null)
      }
      callback(null, html)
    })
  }
})

application.start()
