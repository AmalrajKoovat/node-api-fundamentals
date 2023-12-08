var express = require('express');
var app = express();
const multer = require('multer');
const path = require('path');
var fs = require("fs");

app.use(express.static('public'));

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, './uploads/'); 
   },
   filename: function (req, file, cb) {
     cb(null, file.originalname); 
   }
 });

 const upload = multer({ storage: storage });

 app.post('/upload', upload.single('image'), (req, res) => {
   if (!req.file) {
     return res.status(400).send('Please upload a file');
   }
   res.status(200).send('File uploaded successfully');
 });

 app.get('/download/:filename', (req, res) => {
   const fileName = req.params.filename;
   const filePath = path.join(__dirname, 'uploads', fileName);
 
   fs.stat(filePath, (err, stats) => {
      if (err || !stats.isFile()) {
        return res.status(404).send('File not found');
      }
      res.download(filePath);
    });
 });

 

app.get('/index.html', function (req, res) {
    console.log("/index start")
    res.sendFile( __dirname + "/" + "index.html" );
    console.log("/index end")
 })

 var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    
    console.log("Example app listening at http://%s:%s", host, port)
 })