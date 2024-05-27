const multer = require('multer');
const path = require('path');

const diskStorage = multer.diskStorage( {
  // a documentação é bem extensa, usaremos somente o básico
  destination: (req, file, cb) => {
    cb(null, 'public/img')
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }

});

module.exports = diskStorage;