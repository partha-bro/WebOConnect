import express from "express";
import { createUser,deleteUser,loginUser,getUser,changePassword,editUser } from "../controllers/user.js";
import auth from "../middleware/auth.js";
import multer from 'multer'


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/public/images/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
  })

  const upload = multer({ storage: storage })

const router = express.Router()

router.post('/create',upload.single('profile_pic'), createUser)
router.delete('/delete', deleteUser)
router.post('/login', loginUser)
router.patch('/changePassword', changePassword)
router.patch('/edit',upload.single('profile_pic'), editUser)
router.get('/',auth, getUser)

export default router