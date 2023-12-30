import { createTransport } from '../config/nodemailer.js' 


export async function sendEmailCancelledAppointment({date, time}){  
    
    let data={}

    if(process.env.ENTORNO == 'produccion'){
         data = {
            service: 'gmail',            
            port: process.env.EMAIL_PORT,
            secure: false,        
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls:{
                rejectUnAuthorized:false
            }               
        }
    }else{
         data = {            
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,            
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS                         
        }
    }   
    
    const transporter = createTransport(
        data
    )    
    
    const info = await transporter.sendMail({
        from: `${process.env.NOMBRE_NEGOCIO} <${process.env.EMAIL_USER}>`,
        to: `${process.env.EMAIL_ADMIN}`,
        subject: `${process.env.NOMBRE_NEGOCIO} - Turno Cancelado`,
        text:`${process.env.NOMBRE_NEGOCIO} - Cancelaron un turno`,
        html: `<p>Hola: Admin, Tienes un turno Cancelado</p>
            <p>La cita estaba programada para el dia ${date} a las ${time} horas.</p>
           
        `
    })

     console.log('Mensaje enviado', info.messageId)
}


