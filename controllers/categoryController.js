
import categoryModel from "../models/category.model.js";

 export const createCat = async(req,res)=>{
    try{
        const {name,description} = req.body;
        if(!name || !description)return res.status(404).json({success:false,message:"all data mandory"})

        const category = new categoryModel({
            name,description
        })
        await category.save()

        return res.status(201).json({success:true,message:"category created successfully"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
 }

 export const getAllCat = async(req,res)=>{
    try{
        const cat = await categoryModel.find({})
        if(cat.length){
            return res.status(200).json({success:true,message:"all category found",cat:cat})
        }
        return res.status(404).json({success:false,message:"category not found"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
 }

 