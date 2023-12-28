import mongoose from "mongoose";
import colors from 'colors'
import { Services } from "../models/Services.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";
import { services } from "../data/servicesVete.js";

const createServices = async (req, res) => {
  console.log("Desde createServices");
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios.");

    return res.status(400).json({
      msg: error.message,
    });
  }
  try {
    const service = new Services(req.body);
    const result = await service.save();

    res.json({
      msg: "El Serivicio de creo correctamente",
      payload: result,
    });
  } catch (error) {
    console.log(colors.red(error));
  }
};

const getSerivices = async (req, res) => {
    try {
        const services = await Services.find()
        res.json(services);
        
    } catch (error) {
        console.log(colors.red(error))
    }
};

const getSerivicesById = async (req, res) => {
  console.log("Desde getSerivices");
  console.log(req.params);
  const { id } = req.params;
  // Validar un object id

  if(validateObjectId(id, res)) return

  // validar que exista

  const service = await Services.findById(id);

  // validar un object id  
  if (!service) {
    return handleNotFoundError("El servicio no existe.", res)
  }
  res.json(service);
}

const updateSerivices = async (req, res) => {
    console.log("Desde updateSerivices");
        
    const { id } = req.params;
    // Validar un object id
   
    if(validateObjectId(id, res)) return

    // validar que exista
  
    const service = await Services.findById(id);
  
    if (!service) {
        return handleNotFoundError("El servicio no existe.", res)
    }
      
    // Mostrar el servicio
   
    service.name = req.body.name || service.name
    service.price = req.body.price || service.price
    service.descrition = req.body.description || service.description

    try {
        await service.save(
            res.json({
                msg: 'El servicio se actualizo correctamente'
            })
        )
    } catch (error) {
        console.log(colors.red(error))
    }
    
};

const deleteSerivices = async (req, res) => {
    console.log("Desde deleteSerivices");
        
    const { id } = req.params;
    // Validar un object id
    if(validateObjectId(id, res)) return
  
    // validar que exista  
    const service = await Services.findById(id);
  
    if (!service) {
        return handleNotFoundError("El servicio no existe.", res)
    }
  
    // Mostrar el servicio 

    try {
        await service.deleteOne()
            res.json({
                msg: 'El servicio se elimino correctamente'
            })
        
    } catch (error) {
        console.log(colors.red(error))
    }
    
};





export { getSerivices, createServices, getSerivicesById, updateSerivices, deleteSerivices }
