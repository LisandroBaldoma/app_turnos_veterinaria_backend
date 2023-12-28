import express from 'express'
import { createServices, deleteSerivices, getSerivices, getSerivicesById, updateSerivices } from '../controllers/servicesController.js'

const router = express.Router()

router.route('/')
    .post(createServices) //POST/api/services
    .get(getSerivices) // GET/api/service

router.route('/:id')
    .get(getSerivicesById) // GET/api/services/:id
    .put(updateSerivices) // PUT/api/services/:id
    .delete(deleteSerivices) // DELETE/api/services/:id

export default router


