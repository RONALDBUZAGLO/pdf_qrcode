const express = require('express')//importa o express
const { main } = require('./index')//inporta 'main' do arquivo index

const app = express()//passa a função require passa 'app'

// app.use("view engine", "ejs")

app.get("/",(req,res) => {
  main().then((ret) => {
    res.setHeader('Content-Disposition', 'attachment; filename=panda.pdf');
    res.setHeader('Content-Transfer-Encoding', 'binary');
	  res.setHeader('Content-Type', 'application/octet-stream');
    res.send(Buffer.from(ret))
  })
})

app.listen(3000, () => {
  console.log('Servidor rodando!');
})
