import express from 'express'
import { register, verifyAccount, login, user, forgotPassword, verifyPasswordResetToken, updatePassword, admin } from '../controllers/authController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const authRoutes = express.Router()

// Rutas de Authenticcion y registro de usuarios
authRoutes.post('/register', register)
authRoutes.get('/verify/:token', verifyAccount)
authRoutes.post('/login', login)
authRoutes.post('/forgot-password', forgotPassword)

authRoutes.route('/forgot-password/:token')
    .get(verifyPasswordResetToken)
    .post(updatePassword)


// Area Privada - Requiere un JWR

authRoutes.get('/user', authMiddleware , user)
authRoutes.get('/admin', authMiddleware , admin)




export default authRoutes