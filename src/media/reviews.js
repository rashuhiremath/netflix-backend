import express from "express"

import uniqid from "uniqid"
import { readReviews ,writeReviews  } from "../lib/fs-tool.js"


const reviewsRouter = express.Router()

reviewsRouter.post("/",async(req,res,next)=>{
    try {

        const reviews = await readReviews()
    const review = {...req.body, id:uniqid(), createdAt:new Date()}
    media.push(review)
    await writeReviews(reviews )
    res.status(201).send(reviews .id)
        
    } catch (error) {
        next(error)
    }

})
reviewsRouter.get("/",async (req,res,next)=>{
    try {
        const reviews = await readReviews()
        res.status(200).send(media)
    
        
    } catch (error) {
        next(error)
    }
    
})
reviewsRouter.get("/:id", async(req,res,next)=>{
    try {
        const  reviews= await readReviews()
        
    const singleReview = media.find((m) => m.id == req.params.id);
    if (singleReview) {
      console.log(singleReview);
      res.status(200).send(singleReview);
    } else {
       next(createError(404, `review with id ${req.params.id} not found`))
    }

        
    } catch ({error}) {
        next(error)
    }
    
})
reviewsRouter.put("/:id",async(req,res,next)=>{
    try {
        const reviews = await readReviews();
        const editReviewsIndex = media.findIndex(
          (index) => index.id === req.params.id
        )
        const editReview = media[editReviewsIndex];
        const updatedReview= {
          ...editReview ,
          ...req.body,
          id: uniqid(),
          createdAt: new Date(),
        };
    
       await  writeMedia(updatedReview);
       res.send("ok")
      } catch (error) {
        next(error);
      }
    
})
reviewsRouter.delete("/:id", async(req,res,next)=>{
    try {
        const reviews = await readReviews();
        const remainingReviews = reviews.filter((m) => m.id !== req.params.id)
       await writeMedia(remainingReviews )
        res.send("deleted successfully");
      } catch (error) {
        next(error);
      }
})

export default reviewsRouter