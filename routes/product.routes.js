import { Router } from "express";
import {  createProd, deleteProd, getAllData, getAllProd, getByHandle, updateProd } from "../controllers/productController.js";

const router = Router()

router.post('/create-product',createProd)
router.get('/get-By-Handle',getByHandle)
router.post('/update-product',updateProd)
router.delete('/delete-prod',deleteProd)
router.get('/get-all',getAllProd)
router.get('/get-all-data',getAllData)


export default router