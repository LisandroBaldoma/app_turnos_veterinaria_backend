import Appointment from "../models/Appointment.js"
import { parse, formatISO, startOfDay, endOfDay, isValid } from 'date-fns'
import { validateObjectId, handleNotFoundError, formatDate } from "../utils/index.js";
import { sendEmailNewAppointment } from "../emails/appointmentEmailService.js";
import { sendEmailUpdateAppointment } from "../emails/UpdateAppointmentEmailService.js";
import { sendEmailCancelledAppointment } from "../emails/canceledAppointmentEmailService.js";



const createAppointment = async (req, res) => {
    const appointment = req.body
    appointment.user = req.user._id.toString()
    // console.log(appointment)
    try {
        const newAppointment = new Appointment(appointment)
        const result = await newAppointment.save()
        await sendEmailNewAppointment({
            date: formatDate(result.date), 
            time: result.time})
        res.json({
            msg:'Tu reserva se realizo correctamente'
        })
    } catch (error) {
        console.log(error)
    }
}

const getAppointmentsByDate = async ( req, res ) => {
    const { date } = req.query
    
    const newDate = parse(date, 'dd/MM/yyyy', new Date())

    if(!isValid(newDate)){
        const error = new Error('Fecha no valida')
        return res.status(400).json({msg:error.message})
    }
    const isoDate = formatISO(newDate)

    const appointment = await Appointment.find({date:{
        $gte : startOfDay(new Date(isoDate)),
        $lte : endOfDay(new Date(isoDate))
    }}).select('time')
    res.json(appointment)
}

const getAppointmentsById = async(req, res) => {
    const { id } = req.params
        
    // Validar po oect id
    if(validateObjectId(id, res)) return

    // Validar que Exista la Cita
    const appointment = await Appointment.findById(id).populate('services')
    if(!appointment){
        return handleNotFoundError('La cita no existe', res)
    }

    // Validar que el usuario que edita l cita sa el que la creo

    if(appointment.user.toString() !== req.user._id.toString()){
        const error = new Error('No tiene los permisos para editar esta Cita')
        return res.status(403).json({msg:error.message})
    }

    // Retornar la cita
    res.json(appointment)
     
} 

const updtaeAppointments = async(req, res) => {
    const { id } = req.params
        
    // Validar po oect id
    if(validateObjectId(id, res)) return

    // Validar que Exista la Cita
    const appointment = await Appointment.findById(id).populate('services')
    if(!appointment){
        return handleNotFoundError('La cita no existe', res)
    }

    // Validar que el usuario que edita l cita sa el que la creo

    if(appointment.user.toString() !== req.user._id.toString()){
        const error = new Error('No tiene los permisos para editar esta Cita')
        return res.status(403).json({msg:error.message})
    }

    const { date, time, totalAmount, services } =  req.body   

    appointment.date = date
    appointment.time = time
    appointment.totalAmount = totalAmount
    appointment.services = services

    try {
       const result = await appointment.save() 
       await sendEmailUpdateAppointment({
        date: formatDate(result.date), 
        time: result.time})
       res.json({
        msg: 'Cita Actualizada Correctamente'
       })
    } catch (error) {
        console.log(error)
    }
    
}

const deleteAppointments = async(req, res)=>{    
    const { id } = req.params
        
    // Validar po oect id
    if(validateObjectId(id, res)) return

    // Validar que Exista la Cita
    const appointment = await Appointment.findById(id).populate('services')
    if(!appointment){
        return handleNotFoundError('La cita no existe', res)
    }

    // Validar que el usuario que edita l cita sa el que la creo

    if(appointment.user.toString() !== req.user._id.toString()){
        const error = new Error('No tiene los permisos para editar esta Cita')
        return res.status(403).json({msg:error.message})
    }

    try {
        const result = await appointment.deleteOne()
        sendEmailCancelledAppointment({
            date: formatDate(result.date), 
            time: result.time})
        res.json({msg:'La cita se Cancelo Correctamente'})
    } catch (error) {
        console.log(error)
    }
}

export {
    createAppointment,
    getAppointmentsByDate,
    getAppointmentsById,
    updtaeAppointments,
    deleteAppointments
}