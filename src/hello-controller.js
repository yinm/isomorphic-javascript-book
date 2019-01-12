import Controller from './lib/controller'
import nunjucks from 'nunjucks'

function onClick(e) {
  console.log(e.currentTarget)
}

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
    this.context.data = { random: Math.floor(Math.random() * 1000) + 1 }
    callback(null)
  }

  toString(callback) {
    let context = getName(this.context)
    context.data = this.context.data

    nunjucks.render('hello.html', context, (err, html) => {
      if (err) {
        return callback(err, null)
      }

      callback(null, html)
    })
  }

  attach(el) {
    console.log(this.context.data.random)
    this.clickHandler = el.addEventListener('click', onClick, false)
  }

  detach(el) {
    el.removeEventListener('click', onClick, false)
  }
}
