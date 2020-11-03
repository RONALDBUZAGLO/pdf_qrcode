var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync('./layout/teste.html', 'utf8');

html = html.replace("{{nome}}", "Udson Souza da Cruz")

var options = { format: 'A4' };

pdf.create(html, options).toFile('./teste.pdf', function(err, res) {
  if (err) return console.log(err);
  console.log(res); // { filename: '/app/businesscard.pdf' }
});

