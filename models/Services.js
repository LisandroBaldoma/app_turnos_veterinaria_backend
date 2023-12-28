import mongoose from 'mongoose'

const servicesSchema = mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim: true
    },
    price:{
        type: Number,
        required:true,
        trim: true
    },
    description:{
        type: String,
        required:true,
        trim: true
    }
})

export const Services = mongoose.model('Services', servicesSchema);

