import { Router } from "express";
import { createCat, getAllCat } from "../controllers/categoryController.js";

const router = Router()

router.post('/add-cat',createCat)
router.get('/get-all',getAllCat)

export default router