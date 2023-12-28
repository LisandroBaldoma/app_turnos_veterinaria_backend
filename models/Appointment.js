import mongoose from 'mongoose'

const appointmentSchema = mongoose.Schema({
    services:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Services'
        }        
        
    ],
    date:{
        type: Date
    },
    time: {
        type: String
    },
    totalAmount:{
        type: Number
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }    
})

// encriptar password
// userSchema.pre('save', async function (next){
//     if(!this.isModified('password')){
//         next()
//     }
//     const salt = await bcrypt.genSalt(10) 
//     this.password = await bcrypt.hash(this.password, salt)

// })

// userSchema.methods.checkPassword = async function(inputPassword){
//     return await bcrypt.compare(inputPassword, this.password)
// }
 
 const Appointment = mongoose.model('Appointment', appointmentSchema);

 export default Appointment