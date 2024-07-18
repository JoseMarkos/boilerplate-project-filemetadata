var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const multer  = require('multer');
require('dotenv').config()

var app = express();
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const upload = multer({ dest: 'uploads/' });
app.post('/api/fileanalyse', upload.single('upfile'), function (req, res, next) {
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
