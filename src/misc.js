import http from 'http'

function getCookieByName(name, cookies) {
  for (let i = 0; i < cookies.length; i++) {
    let [key, value] = cookies[i].split('=')
    if (key.trim() === name) {
      return value
    }
  }
}

http.createServer((req, res) => {
  console.log(getCookieByName('some-cookie', req.headers.cookie.split(';')))
  res.end('hello\n')
}).listen(8080)
