import Application from './lib'
import HelloController from './hello-controller'
import nunjucks from 'nunjucks'

nunjucks.configure('/templates')

const application = new Application({
  '/hello/{name*}': HelloController
}, {
  target: 'body'
})

application.start()
