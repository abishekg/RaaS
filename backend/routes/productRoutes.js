import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  createProductReview,
  getTopProducts,
  addProduct,
  getAllProducts,
  getProductByUserId,
} from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

//New
router.route('/addProduct').post(addProduct)
router.route('/getAllProducts').get(getAllProducts)
router.route('/getProduct/:id').get(getProductByUserId)

router.route('/').get(getProducts).post(protect, admin, createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/top', getTopProducts)
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)

export default router
