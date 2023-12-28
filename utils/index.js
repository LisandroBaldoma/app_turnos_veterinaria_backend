import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import { format } from 'date-fns';
import es from 'date-fns/locale/es/index.js';


function validateObjectId(id, res){

    if (!mongoose.Types.ObjectId.isValid(id,res)) {
        const error = new Error("El Id no es valido.");
    
        return res.status(400).json({
          msg: error.message,
        });
      }
}

function handleNotFoundError(mensaje, res){
    const error = new Error(mensaje)
    return res.status(404).json({
        msg: error.message
    })
}

// Genera un token aleatorio.
const uniqueId = () => Date.now().toString(32) + Math.random().toString(32).substring(2);

// generar JWT
const generateJWT = (id) => {    
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn:'30d'
    })

    return token
}

function formatDate(date){
    return format(date, 'PPPP', { locale:es })
}

export {
    validateObjectId,
    handleNotFoundError,
    uniqueId,
    generateJWT,
    formatDate
    
}