import express from 'express'
import { createAppointment, getAppointmentsByDate, getAppointmentsById, updtaeAppointments, deleteAppointments } from '../controllers/appointmentController.js'
import authMiddleware from '../middleware/authMiddleware.js'

const appointmentsRoutes = express.Router()


appointmentsRoutes.route('/')
    .post(authMiddleware, createAppointment)
    .get(authMiddleware, getAppointmentsByDate)

appointmentsRoutes.route('/:id')
    .get(authMiddleware, getAppointmentsById)
    .put(authMiddleware, updtaeAppointments)
    .delete(authMiddleware, deleteAppointments)




export default appointmentsRoutes