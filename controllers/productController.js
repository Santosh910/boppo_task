import productModel from "../models/product.model.js";


export const createProd = async(req,res)=>{
    try{
        const {name,price,category_id,description}=req.body;
        if(!name || !price || !category_id || !description )return res.status(401).json({success:false,message:"all data is mandotory"})

          
        const product = new productModel({
            name,price,category_id,description
        })
        await product.save()

        

        return res.status(201).json({success:true,message:"product created successfully"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
 }

 export const getByHandle = async(req,res)=>{
    try{
        const {_id:productId} = req.body;
        if(!productId)return res.status(404).json({success:false,message:"id not found"})

        const product = await productModel.findById(productId)
        if(product){
            return res.status(200).json({success:true,message:"productc found",product:product})
        }
        return res.status(404).json({success:false,message:"products not found"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
 }

 export const getAllProd = async(req,res)=>{
    try{
        const products = await productModel.find({})
        if(products.length){
            return res.status(200).json({success:true,message:"all product found",products:products})
        }
        return res.status(404).json({success:false,message:"products not found"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
 }

 export const updateProd = async(req,res)=>{
    try{
        const {name,price,category_id,description,_id}=req.body;
        if(!name || !price || !category_id || !description || !_id)return res.status(401).json({success:false,message:"all data is mandotory"})

        const update = await productModel.findByIdAndUpdate(_id,{name,price,category_id,description})
        if(update){
            return res.status(201).json({success:true,message:"product updated successfully",update:update})
        }
        return res.status(404).json({success:false,message:"products not update"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
 }

 export const deleteProd = async(req,res)=>{
    try{
        const {_id} = req.body;
        if(!_id)return res.status(404).json({success:false,message:"id not found"})


        await productModel.findByIdAndDelete(_id)

        return res.status(201).json({success:true,message:"product deleted successfully"})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
 }

export const getAllData = async (req,res)=>{
    try{
        const aggData = await productModel.aggregate([
            {
                $lookup :{
                    from:"catogories",
                    localField:"category_id",
                    foreignField:"_id",
                    as:"category"
                }
            },
            {
                $project:{
                    _id:1,
                    name:1,
                    price:1,
                    category:{
                        $arrayElemAt:
                        ["$category.name",0]
                    }
                }
            }
                  
        ])
        const count = aggData.length;
        return res.status(200).json({success:true,data:{noOfProduct:count,data:aggData}})
    }catch(error){
        return res.status(500).json({success:false,message:error})
    }
}

