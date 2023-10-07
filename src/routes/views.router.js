import { Router } from "express";
import { productsManager } from "../Manager/ProductManager.js";

const router = Router()

router.get('/', async(req, res) => {
    const products = await productsManager.getProducts({})
    res.render('home', {products})
})
router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts')
})



export default router;