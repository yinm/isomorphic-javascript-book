import http from 'http'

http.createServer((req, res) => {
  res.writeHead(200, {
    'Set-Cookie': 'some-cookie=some value',
    'Content-Type': 'text/plain'
  })
  res.end('Hello\n')
}).listen(8080)
