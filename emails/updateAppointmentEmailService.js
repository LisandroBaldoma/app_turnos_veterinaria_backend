import { createTransport } from '../config/nodemailer.js' 


export async function sendEmailUpdateAppointment({date, time}){  
    
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
        subject: 'Veterinaria - Cita Actualizada',
        text:"Veterinaria - Modificaron la reserva el turno",
        html: `<p>Hola: Admin, un paciente acualizo su turno</p>
            <p>Modificaron un turno para el dia: ${date} a las ${time} horas.</p>
           
        `
    })

     console.log('Mensaje enviado', info.messageId)
}


