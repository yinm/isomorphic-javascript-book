import Hapi from 'hapi';
import nunjucks from 'nunjucks';
import Application from './lib'
import Controller from './lib/controller'

nunjucks.configure('./dist');

const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: 8000
});

const application = new Application({
  '/': Controller
}, {
  server: server
})

application.start()
