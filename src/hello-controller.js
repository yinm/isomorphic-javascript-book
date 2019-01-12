import Controller from './lib/controller'
import nunjucks from 'nunjucks'

function getName(context) {
  let name = {
    fname: 'Rick',
    lname: 'Sanchez'
  }

  let nameParts = context.params.name
    ? context.params.name.split('/')
    : []

  name.fname = (nameParts[0] || context.query.fname) || name.fname
  name.lname = (nameParts[1] || context.query.lname) || name.lname

  return name
}

export default class HelloController extends Controller {
  index(application, request, reply, callback) {
    this.context.cookie.set('random', '_' + (Math.floor(Math.random() * 1000) + 1), {path: '/'})
    callback(null)
  }

  toString(callback) {
    nunjucks.render('hello.html', getName(this.context), (err, html) => {
      if (err) {
        return callback(err, null)
      }

      callback(null, html)
    })
  }
}
