export default class Application {
  navigate(url, push=true) {
    if (!history.pushState) {
      window.location = url
      return
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
