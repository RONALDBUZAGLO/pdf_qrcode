const api = require('express')
const { main } = require('./index')

const server = api()

server.route('/').get((req, res) => {
  main().then(ret => {
    res.setHeader('Content-Disposition', 'attachment; filename=panda.pdf');
    res.setHeader('Content-Transfer-Encoding', 'binary');
	  res.setHeader('Content-Type', 'application/octet-stream');
    res.send(Buffer.from(ret))
  })
})

server.listen(4000, () => {
  console.log('server started')
})
