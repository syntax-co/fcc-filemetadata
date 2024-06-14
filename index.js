var express = require('express');
var cors = require('cors');
var multer = require('multer')
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
       cb(null, 'public/uploads')
 },
  filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
  }
});

const upload = multer({ storage: storage });

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

function intToBytes(int) {
  let byteArray = new Uint8Array(4);
  for (let i = 0; i < 4; i++) {
      byteArray[i] = (int >> (8 * (3 - i))) & 0xFF;
  }
  return byteArray;
}

app.post('/api/fileanalyse',upload.single('upfile'),(req,res) => {
  
  const fileData = req.file
  

  const final = {
    name:fileData.originalname,
    type:fileData.mimetype,
    size:fileData.size
  } 

  res.json(final)
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
