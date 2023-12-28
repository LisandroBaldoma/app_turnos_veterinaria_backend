import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getUserAppointments } from '../controllers/userController.js'






const usersRoutes = express.Router()

// Rutas de Authenticcion y registro de usuarios
usersRoutes.route('/:user/appointments')
    .get(authMiddleware, getUserAppointments)





export default usersRoutes