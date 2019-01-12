import Application from './lib'
import HelloController from './hello-controller'
import nunjucks from 'nunjucks'
import options from './options'
import HomeController from './HomeController'

nunjucks.configure(options.nunjucks, {autoescape: false})

const application = new Application({
  '/hello/{name*}': HelloController,
  '/': HomeController
}, options)

application.start()
