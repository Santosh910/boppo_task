import { Router } from "express";
import productRoutes from './product.routes.js'
import catRoutes from './category.routes.js'

const router = Router()

router.use('/product',productRoutes)
router.use('/category',catRoutes)

export default router