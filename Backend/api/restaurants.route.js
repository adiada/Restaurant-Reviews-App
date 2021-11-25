import express from 'express'
import RestaurantsCtrl from './restaurants.controller.js'

const router = express.Router()

router.route('/').get(RestaurantsCtrl.apiGetRestaurants)

router
    .route('/reviews')
    .post(ReviewsCtril.apiPostReview)
    .put(ReviewsCtrl.apiUpdateReview)
    .delete(ReviewsCtrl.apiDeleteReview)

export default router