import ReviewsDAO from '../dao/reviewsDAO.js'

export default class ReviewsController {
    static async apiPostReview(req,res,next){
        try{
            const restaurantID = req.body.restaurant_id
            const review = req.body.text
            const userInfo = {
                name: req.body.name,
                _id: req.body.user_id
            }
            const date = new Date()

            const ReviewResponse = await ReviewsDAO.addReview(
                restaurantID,
                userInfo,
                review,
                date
            )
            res.json({status:'success'})
        }catch(e){
            res.status(500).json({error: e.message})
        }
    }


    static async apiUpdateReview(req,res,next){
        try{
            const reviewId = req.body.review_id
            const userId = req.body.user_id
            const text = req.body.text
            const date = new Date()

            const reviewResponse = await ReviewsDAO.updateReview(
                reviewId,
                userId,
                text,
                date,
            )

            let { error } = reviewResponse
            if(error){
                res.status(400).json({error : error})
            }

            if(reviewResponse.modifiedCount === 0){
                throw new Error('Unable to update review - user may not be a original poster')
            }

            res.json({status:'success'})

        } catch (e) {
            res.status(500).json({error:e.message})
        }

    }

    //It is non standard to have anything in the body for a delete request
    //but for this example we are doing it this way to verify it is the correct user who made this review
    //In production environment, you will not be authenticating this way
    static async apiDeleteReview(req,res,next){
        try{
            const reviewId = req.query.id
            const userId = req.body.user_id
            console.log(reviewId)

            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewId,
                userId
            )
            res.json({status:'success'}) 
        } catch (e) {
            res.status(500).json({error:e.message})
        }
    }

}