var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./layout/teste.html', 'utf8');
var qrcode = require('qrcode')

const code = qrcode.toDataURL("Eu sou um QRCode diferentao", function(err, value ) {
  if (err) {
    console.log(err)
    return
  }

  html = html
    .replace("{{nome}}", "Udson Souza da Cruz")
    .replace("{{qrcode}}", value)
  var options = { format: 'A4' };
  
  pdf.create(html, options).toFile('./teste.pdf', function(err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
})



