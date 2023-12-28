import { sendEmailVerification, sendEmailPasswordReset } from "../emails/authEmailService.js";
import  User  from "../models/User.js"
import { generateJWT, uniqueId } from "../utils/index.js";


const register = async (req, res) => {
    // Valida todos los campos
    if (Object.values(req.body).includes("")) {
        const error = new Error("Todos los campos son obligatorios.");
    
        return res.status(400).json({msg: error.message});
      }

    const { email, password, name } = req.body  
    // Evita registros duplicados
    const userExists = await User.findOne({email})
    if(userExists){        
        const error = new Error("Usuario ya registrado");    
        return res.status(400).json({msg: error.message});
    }
    // Vaalidar la extension del password
    const MIN_PASSWORD_LENGTH = 8
    if(password.trim().length < MIN_PASSWORD_LENGTH){
        const error = new Error(`El password debe contener ${MIN_PASSWORD_LENGTH} caracateres`)
        return res.status(400).json({msg:error.message})
    }     
      try {
        const user = new User(req.body)
        const result = await user.save()

        const { name, email, token } = result

        sendEmailVerification({
          name,
          email,
          token
        })


        res.json({
            msg:'El usuario se creo correctamente, revisa tu email'
        })
        
      } catch (error) {
        console.log(error)
      }
}

const verifyAccount = async (req, res) => {
  const { token } = req.params

  const user = await User.findOne({token})
  if(!user){
    const error = new Error('Error, token no valido')
    return res.status(401).json({msg:error.message})
  }
  // si el token es valido confirmar la cuenta

  try {
    user.verified = true
    user.token = ''
    await user.save()
    res.json({msg:'Usuario confirmado Correctamente'})
  } catch (error) {
    console.log(error)
    
  }
}

const login = async (req, res) => {
 
  const { email, password } = req.body
  
  // revisar si el usuario existe
  const user = await User.findOne({email})
  if(!user){
    const error = new Error('El usuario no existe')
    return res.status(401).json({msg:error.message})
  }
  // revisar si el usuario confirmo la cuenta
  if(!user.verified){
    const error = new Error('Tu cuenta no ha sido confirmada aun')
    return res.status(401).json({msg:error.message})
  }
  // comprobar el password
  if(await user.checkPassword(password)){
    
    const token = generateJWT(user._id);    
    
    res.json({
      token
    })

  }else{
    const error = new Error('El password es incorrecto')
    return res.status(401).json({msg:error.message})
  }  
}

const forgotPassword = async (req, res ) => {
  const { email } = req.body

  // comprobar si el email existe  
  const user = await User.findOne({email})
  if(!user){
    const error = new Error('El usuario no existe')
    
    return res.status(404).json({msg:error.message})
  }
  try {
    user.token = uniqueId()    
    
    await user.save()
    
    await sendEmailPasswordReset({
      name: user.name,
      email: user.email,
      token: user.token
    })
    res.json({msg:'Hemos enviado un email con las instrucciones'})

  } catch (error) {
    console.log(error)
  }

}

const verifyPasswordResetToken = async (req, res ) => {
  const { token } = req.params
  
  const isValidToken = await User.findOne({token})
  // console.log(isValidToken)
  if(!isValidToken){
    const error = new Error('Hubo un error, Token invalido')
    return res.status(400).json({ msg:error.message })
  }
  
  res.json({ msg:'Token Valido' })
  
}

const updatePassword = async (req, res ) => {
  
  const { token } = req.params
  const user = await User.findOne({token})
  
  if(!user){
    const error = new Error('Hubo un error, Token invalido')
    return res.status(400).json({ msg:error.message })
  }
  const { password } = req.body
  try {
    user.token = ''
    user.password = password
    await user.save()
    res.json({msg:'Password modificado Correctamente'})
   } catch (error) {
    console.log(error)
  }
}

const user = async (req, res) => {
  const { user } = req  
  res.json(user)

}

const admin = async (req, res) => {
  const { user } = req 
  if(!user.admin){
    const error = new Error('Accion no valda')
    return res.status(403).json({msg:error.message})
  } 
  res.json(user)

}

export{
    register,
    verifyAccount,
    login,
    forgotPassword,
    verifyPasswordResetToken,
    updatePassword,
    user,
    admin
}