import { createTransport } from '../config/nodemailer.js' 


export async function sendEmailNewAppointment({date, time}){  
    
    const data = {
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
    
    const transporter = createTransport(
        data
    )    
    
    const info = await transporter.sendMail({
        from: 'Veterinaria <citas@veterinaria.com>',
        to: 'admin@correo.com',
        subject: 'Veterinaria - Nueva Cita',
        text:"Veterinaria - Tienes una nuevo turno asignado",
        html: `<p>Hola: Admin, Tienes un nuevo turno</p>
            <p>Reservaron un nuevo turno para el dia: ${date} a las ${time} horas.</p>
           
        `
    })

     console.log('Mensaje enviado', info.messageId)
}


