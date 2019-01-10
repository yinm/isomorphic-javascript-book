import Call from 'call'

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

    let urlParts = url.split('?')
    let [path, search] = urlParts
    let match = this.router.route('get', path)
    let { route, params } = match
    let Controller = this.routes[route]

    if (route && Controller) {
      console.log(match)
      console.log(Controller)
    }

    console.log(url)

    if (push) {
      history.pushState({}, null, url)
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
  }
}
