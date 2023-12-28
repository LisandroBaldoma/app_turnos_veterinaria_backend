import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import cors from 'cors'

import { db } from './config/db.js'
import servicesRoutes from './routes/servicesRoutes.js'
import authRoutes from './routes/authRoutes.js'
import appointmentsRoutes from './routes/appointmentsRoutes.js'
import usersRoutes from './routes/userRoutes.js'


// Cargo variables de entorno
dotenv.config();

//Configurar la app
const app = express();

//leer datos via body
app.use(express.json());

// Levanto Base de datos

db();

// Configurar CORS
// undefined lo uso solo parar permitir las peticiones desde POSTMAN quitarlo antes de subir a produccion
let whiteList = [process.env.FRONTEND_URL]

console.log(process.argv[2])

if(process.argv[2] === '--postman'){
    whiteList.push(undefined)
}

const corsOptions = {
    origin: function(origin, callback) {
        if(whiteList.includes(origin)){
            // Permite la conexion
            callback(null, true)
        }else{
            //No permite la conexion
            callback(new Error('Error de CORS'))
        }
    }
}

app.use(cors(corsOptions))

//Definir rutas

app.use('/api/services', servicesRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/appointments', appointmentsRoutes)
app.use('/api/users', usersRoutes)


//Definir puerto
const PORT = process.env.PORT || 8080

//Arrancar la app

app.listen(PORT, () => {
    console.log(colors.blue('El servidor se esta ejecutando en el puerto:', colors.blue.bold(PORT)))

})