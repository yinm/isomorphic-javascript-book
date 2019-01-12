import Call from 'call'
import query from 'query-string'
import cookie from './cookie.client'
import replyFactory from './reply.client'

export default class Application {
  constructor(routes, options) {
    this.routes = routes
    this.options = options
    this.router = new Call.Router()
    this.registerRoutes(routes)
  }

  registerRoutes(routes) {
    for (let path in routes) {
      this.router.add({
        path: path,
        method: 'get'
      })
    }
  }

  navigate(url, push=true) {
    if (!history.pushState) {
      window.location = url
      return
    }

    let previousController = this.controller
    this.controller = this.createController(url)

    if (this.controller) {
      const request = () => {}
      const reply = replyFactory(this)

      if (push) {
        history.pushState({}, null, url)
      }

      this.controller.index(this, request, reply, (err) => {
        if (err) {
          return reply(err)
        }

        let targetEl = document.querySelector(this.options.target)
        if (previousController) {
          previousController.detach(targetEl)
        }

        this.controller.render(this.options.target, (err, response) => {
          if (err) {
            return reply(err)
          }

          reply(response)

          this.controller.attach(targetEl)
        })
      })
    }
  }

  start() {
    this.popStateListener = window.addEventListener('popstate', (e) => {
      let {pathname, search} = window.location
      let url = `${pathname}${search}`
      this.navigate(url, false)
    })

    this.clickListener = window.addEventListener('click', (e) => {
      let { target } = e
      let identifier = target.dataset.navigate
      let href = target.getAttribute('href')

      if (identifier !== undefined) {
        if (href) {
          e.preventDefault()
        }

        this.navigate(identifier || href)
      }
    })

    this.rehydrate()
  }

  createController(url) {
    let urlParts = url.split('?')
    let [path, search] = urlParts
    let match = this.router.route('get', path)
    let { route, params } = match
    let Controller = this.routes[route]

    return Controller ?
      new Controller({
        query: query.parse(search),
        params: params,
        cookie: cookie
      }) : undefined
  }

  getUrl() {
    let { pathName, search } = window.location
    return `${pathName}${search}`
  }

  rehydrate() {
    let targetEl = document.querySelector(this.options.target)

    this.controller = this.createController(this.getUrl())
    this.controller.deserialize()
    this.controller.attach(targetEl)
  }
}
