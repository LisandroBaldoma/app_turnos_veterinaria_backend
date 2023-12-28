import Appointment from '../models/Appointment.js'

const getUserAppointments = async (req, res) => {
    
    const { user } = req.params

    // tambien podriamos darle acceso al admin agregando al if la condicion para que evalue si tiene rol admin
    // de esta forma el endpoint podria usarse tambien para panel de administrador cuando quiero ver todas las citas
    
    if(user !== req.user._id.toString() ){
        const error = new Error('Acceso Denegado')
        return res.status(400).json({msg:error.message})
    }    

    try {
        // console.log(req.user.admin)
        // uso un operador ternario para que la consulta la haga en base a quesi el usuario es adminse pueda traer todas las citas y si es un usuario traiga solo las citas de ese usuario
        const query = req.user.admin ? {date: {$gte : new Date() }} : {user,  date: {$gte : new Date()} }
        
        const appointments = await Appointment
            .find(query)
            .populate('services')
            .populate({path:'user', select:'name email'})
            .sort({date: 'asc'})

        res.json(appointments)    
    } catch (error) {
        console.log(error)
    }
}

export {
    getUserAppointments
}






