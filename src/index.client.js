import Application from './lib'
import HelloController from './hello-controller'
import nunjucks from 'nunjucks'

nunjucks.configure('/template')

const application = new Application({
  '/hello/{name*}': HelloController
}, {
  target: 'body'
})

application.start()
