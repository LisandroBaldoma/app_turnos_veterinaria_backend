import { createTransport } from '../config/nodemailer.js' 


export async function sendEmailVerification({name, email, token}){  
    
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
        from: 'Veterinaria <cuentas@veterinaria.com>',
        to: email,
        subject: 'Veterinaria - Confirma tu cuenta',
        text:"Veterinaria - Confirma tu cuenta",
        html: `<p>Hola: ${name}, confirma tu cuenta en Veterianria</p>
            <p>Tu cuenta esta casi listam sole debes confirmarla en el siguiente enlace</p>
            <a href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Confirmar cuenta</a>
            <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje </p>
        `
    })

     console.log('Mensaje enviado', info.messageId)
}

export async function sendEmailPasswordReset({name, email, token}){  

    console.log('Send email password')
    
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
        from: 'Veterinaria <cuentas@veterinaria.com>',
        to: email,
        subject: 'Veterinaria - Restablece tu password',
        text:"Veterinaria - Restablece tu password",
        html: `<p>Hola: ${name}, Has solicitado reestablecer tu password</p>
            <p>Sigue el siguiente enlace para generar un nuevo password:</p>
            <a href="${process.env.FRONTEND_URL}/auth/olvide-password/${token}">Restablecer Password</a>
            <p>Si tu no solicitaste restablecer el password de tu cuenta, puedes ignorar este mensaje </p>
        `
    })

     console.log('Mensaje enviado', info.messageId)
}


