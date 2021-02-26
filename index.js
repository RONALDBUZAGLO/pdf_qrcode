const fs = require('fs');
const path = require('path');
const pdf = require('html-pdf');

var html = fs.readFileSync('views/pages/teste.html', 'utf8');
//retorna para 'html' o arquivo inteiro 'teste.html

const qrcode = require('qrcode')
const { PDFDocument } = require('pdf-lib') 


function generatePage() {
  //início da promise
  return new Promise((resolve, reject) => {
    //retorna uma URI contendo uma representação de uma imagem qrcode(imagem/png)
    //texto, nível de correção,funcção de callback
    qrcode.toDataURL("Testando conteúdo do QRCode",{ errorCorrectionLevel: 'H' }, (err, value)=>{
      //se pegar um erro na criação do URI retorna reject para promise
      if (err) {
        reject("Erro ao criar a URI: " + err);
      }
      
      //passa uma string com um caminho
      const imagePath = path.normalize(__dirname + '//layout');

      // console.log("============="+value);
      // console.log(path.normalize(imagePath)+"=================")
      //'html' recebe ele mesmo modificando os campos onde estão {{nome}} e {{qrcode}}

      html = html
        .replace("{{nome}}", "Ronald Buzaglo Pessoa")
        .replace("{{qrcode}}", value)

      //determina as opções de formatação do doc pdf nesse caso A4 tamanho e base(em base foi passado um caminho)
      var options = { format: 'A4', base: imagePath };
    
      pdf.create(html, options).toBuffer((err, res) => {
        //se pegar um erro na criação do pdf retorna reject para promise
        if(err){
          reject("Erro ao gerar o pdf: " + err);
        }
        //'res' é o buffer do arquivo pdf retornado de create caso não dê nenhum erro na geração do pdf
        //conversão do res para um formato legível
        resolve(Uint8Array.from(res));

      });
    });
  });
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
