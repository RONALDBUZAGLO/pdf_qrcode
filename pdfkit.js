const PDFDocument = require('pdfkit')
const fs = require('fs')

const doc = new PDFDocument();

doc.text("A Vingança nunca é plena, mata a alma e a envenena", 56, 417)


doc.pipe(fs.createWriteStream(__dirname + '//teste2.pdf'))

doc.end();