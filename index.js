const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');
var html = fs.readFileSync('./layout/teste.html', 'utf8');
const qrcode = require('qrcode')
const { PDFDocument } = require('pdf-lib') 


function generatePage() {
  return new Promise((resolve, reject) => {
    const code = qrcode.toDataURL("Eu sou um QRCode diferentao", function(err, value ) {
      if (err) {
        console.log(err)
        reject(err)
      }
    
      const imagePath = __dirname + '//layout'
    
      console.log(path.normalize(imagePath))
    
      html = html
        .replace("{{nome}}", "Udson Souza da Cruz")
        .replace("{{qrcode}}", value)
      var options = { format: 'A4', base: path.normalize(imagePath) };
    
      pdf.create(html, options).toBuffer((err, res) => {
        if (err) reject(err)

        resolve(Uint8Array.from(res))
      });
    })
  })
}

async function main() {
  const page1 = await generatePage()
  const page2 = await generatePage()

  const firstDonorPdfDoc = await PDFDocument.load(page1)
  const secondDonorPdfDoc = await PDFDocument.load(page2)

  const pdfDoc = await PDFDocument.create();

  const [firstDonorPage] = await pdfDoc.copyPages(firstDonorPdfDoc, [0])
  const [secondDonorPage] = await pdfDoc.copyPages(secondDonorPdfDoc, [0])

  pdfDoc.addPage(firstDonorPage)
  pdfDoc.insertPage(0, secondDonorPage)

  const pdfBytes = await pdfDoc.save()

  return pdfBytes
}

module.exports = {main}