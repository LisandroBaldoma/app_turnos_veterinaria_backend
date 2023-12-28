import { createTransport } from '../config/nodemailer.js' 


export async function sendEmailCancelledAppointment({date, time}){  
    
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
        subject: 'Veterinaria - Turno Cancelado',
        text:"Veterinaria - Cancelaron un turno",
        html: `<p>Hola: Admin, Tienes un turno Cancelado</p>
            <p>La cita estaba programada para el dia ${date} a las ${time} horas.</p>
           
        `
    })

     console.log('Mensaje enviado', info.messageId)
}


