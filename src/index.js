import Hapi from 'hapi';
import nunjucks from 'nunjucks'

nunjucks.configure('./dist')

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000
});

// Add the route
server.route({
    method: 'GET',
    path:'/hello',
    handler: function (request, reply) {
      nunjucks.render('index.html', {
          fname: 'Rick',
          lname: 'Sanchez'
      }, function (err, html) {
          reply(html)
      })
    }
});

// Start the server
server.start();
