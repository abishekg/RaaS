import path from 'path'
import express from 'express'
import multer from 'multer'
import {uploadImage} from "../utils/gcp.js";

const router = express.Router()

const multerMid = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
});

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, 'uploads/')
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//     )
//   },
// })
//
// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//   const mimetype = filetypes.test(file.mimetype)
//
//   if (extname && mimetype) {
//     return cb(null, true)
//   } else {
//     cb('Images only!')
//   }
// }
//
// const upload = multer({
//   storage,
//   fileFilter: function (req, file, cb) {
//     checkFileType(file, cb)
//   },
// })

router.post('/', multerMid.single('file'), async (req, res) => {
    try {
        const imageUrl = await uploadImage(req.file);
        res.status(200).json({message: 'Upload successful', data: imageUrl})
    } catch (e) {
        res.status(500).json({error: e, message: 'Internal Server Error'})
    }
    // res.send(`/${req.file.path}`)
})

export default router
