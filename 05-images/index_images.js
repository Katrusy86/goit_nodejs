const express = require("express");
const multer = require("multer");
const morgan = require("morgan");
const path = require("path")
const imagemin = require('imagemin');
const {promises:fsPromises} = require("fs")
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');
 

const storage = multer.diskStorage({
  destination:'./tmp',
  filename:(req, file, callback) =>{
      const {ext} = path.parse(file.originalname);
      return callback(null, Date.now() + ext)
  }
})
const upload = multer({ storage })

const PORT = 3000
const app = express()
morgan('tiny')

app.use(express.static('../05-images/public/images'))

app.post("/images", upload.single('avatar'), minifyImage, (req, res, next)=>{
  console.log('req.body', req.body);
  console.log('req.file', req.file);
  console.log('req.files', req.files);
})

async function minifyImage (req, res, next) {
  const {path:filePath, destination:multerDest, filename} = req.file;
  const DESTINATION_PATH = "../05-images/public/images"
  
  const files=await imagemin([`${multerDest}/${filename}`], {
    destination:"../05-images/public/images",
    plugins:[
      imageminJpegtran(),
      imageminPngquant({
        quality:[0.6, 0.8]
      })
    ]
  })
  await fsPromises.unlink(filePath)
  req.file.destination = DESTINATION_PATH,
   req.file.path = path.join(DESTINATION_PATH, filename)

   next()
}

app.listen(PORT, () => {
  console.log("Server started listening on port", PORT);
});
