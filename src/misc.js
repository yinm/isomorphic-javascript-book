import http from 'http'

http.createServer((req, res) => {
  res.writeHead(302, {
    'Location': 'http://theoatmeal.com/',
    'Content-Type': 'text/plain'
  })

  res.end('hello\n')
}).listen(8080)
