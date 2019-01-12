import cookieFactory from './cookie'

export default class Application {
  constructor(routes, options) {
    this.server = options.server
    this.document = options.document
    this.registerRoutes(routes)
  }

  registerRoutes(routes) {
    for (let path in routes) {
      this.addRoute(path, routes[path])
    }
  }

  addRoute(path, Controller) {
    this.server.route({
      path: path,
      method: 'GET',
      handler: (request, reply) => {
        const controller = new Controller({
          query: request.query,
          params: request.params,
          cookie: cookieFactory(request, reply)
        })

        controller.index(this, request, reply, (err) => {
          if (err) {
            return reply(err)
          }

          controller.toString((err, html) => {
            if (err) {
              return reply(err)
            }

            this.document(this, controller, request, reply, html, function (err, html) {
              if (err) {
                return reply(err)
              }

              reply(html)
            })
          })
        })
      }
    })
  }

  start() {
    this.server.start()
  }
}
