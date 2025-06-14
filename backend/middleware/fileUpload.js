const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let filepath = "public/uploads";
    if (!fs.existsSync(filepath)) {
      fs.mkdirSync(filepath, { recursive: true });
    }

    cb(null, filepath);
  },
  filename: function (req, file, cb) {
    let extname = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extname);
    // abc.jpeg : extname-> .jpeg  basename -> abc

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    let filename = file.fieldname + "-" + basename + extname;
    cb(null, filename);
  },
});

const fileFilter = (req, file, cb) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp|svg|avif)$/i)) {
    cb(new Error("FILE FORMAT INCORRECT"), false);
  } else {
    cb(null, true);
  }
};

const upload = multer({
  storage: storage,
  limit: {
    fileSize: 2000000000,
  },
  fileFilter: fileFilter,
});

module.exports = upload;
