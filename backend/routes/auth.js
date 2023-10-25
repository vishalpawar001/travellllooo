import express from 'express'
import { login, register , adminLogin} from '../Controllers/authController.js'
// import bcrypt from 'bcryptjs'
// import jwt from 'jsonwebtoken'

const router = express.Router()


router.post('/register', register)
router.post('/login', login)
router.post('/admin/login', adminLogin);


export default router