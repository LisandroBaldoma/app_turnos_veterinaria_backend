import { createTransport } from '../config/nodemailer.js' 


export async function sendEmailVerification({name, email, token}){  
    
    let data={}

    if(process.env.ENTORNO == 'produccion'){
        console.log('ENTORNO----',process.env.ENTORNO)
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

        console.log('DATA ----', data)
    }else{
        console.log('PASO POR TEST------')
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
            to: email,
            subject: `${process.env.NOMBRE_NEGOCIO} - Confirma tu cuenta`,
            text: `${process.env.NOMBRE_NEGOCIO} - Confirma tu cuenta`,
            html: `<p>Hola: ${name}, confirma tu cuenta en <strong>${process.env.NOMBRE_NEGOCIO}</strong></p>
                <p>Tu cuenta esta casi lista sole debes confirmarla en el siguiente enlace</p>
                <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
                <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje </p>
            `
        })
        
        console.log('Mensaje enviado', info.messageId)     
}

export async function sendEmailPasswordReset({name, email, token}){  

    console.log('Send email password')
    
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
        to: email,
        subject: `${process.env.NOMBRE_NEGOCIO} - Restablece tu password`,
        text: `${process.env.NOMBRE_NEGOCIO} - Restablece tu password`,
        html: `<p>Hola: ${name}, Has solicitado reestablecer tu password</p>
            <p>Sigue el siguiente enlace para generar un nuevo password:</p>
            <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Restablecer Password</a>
            <p>Si tu no solicitaste restablecer el password de tu cuenta, puedes ignorar este mensaje </p>
        `
    })

     console.log('Mensaje enviado', info.messageId)
}


