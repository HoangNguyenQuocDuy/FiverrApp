import User from '../models/user.model'
import Review from '../models/review.model'
import Gig from '../models/gig.model'
import createError from '../utils/createError'

export const getReviews = async(req, res, next) => {
    try{
        const reviews = await Review.find({ gigId: req.params.gigId })
        return res.status(200).send(reviews)
    } catch(err){
        return next(err)
    }
}

export const deleteReview = (req, res, next) => {
    try{

    } catch(err){
        return next(err)
    }
}

export const createReview = async(req, res, next) => {
    if (req.isSeller) return next(createError(403, 'You can\'t create a review!'))
    const newReview = new Review({ 
        userId: req.userId,
        gigId: req.body.gigId,
        star: req.body.star,
        desc: req.body.desc ,
     })
    try{
        const review = await Review.findOne({ userId: req.userId, gigId: req.body.gigId })
        if (review) return next(createError(403, 'You have already created a review for this gig!'))

        const saveReview = await newReview.save()
        
        //update gig
        await Gig.findByIdAndUpdate(req.body.gigId, { $inc: { totalStar: req.body.star, starNumber: 1 } })

        return res.status(200).send(saveReview)
    } catch(err){
        return next(err)
    }
}