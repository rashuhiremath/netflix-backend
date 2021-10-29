import express from "express"

import uniqid from "uniqid"
import { readMedia,writeMedia } from "../lib/fs-tool.js"
import { savePoster } from "../lib/fs-tool.js"
import multer from "multer"
import { extname } from "path"


const mediaRouter = express.Router()

mediaRouter.post("/",async(req,res,next)=>{
    try {

        const media = await readMedia()
    const singleMedia = {...req.body, id:uniqid(), createdAt:new Date()}
    media.push(singleMedia)
    await writeMedia(media)
    res.status(201).send(media.id)
        
    } catch (error) {
        next(error)
    }

})
mediaRouter.get("/",async (req,res,next)=>{
    try {
        const media = await readMedia()
        res.status(200).send(media)
    
        
    } catch (error) {
        next(error)
    }
    
})
mediaRouter.get("/:id", async(req,res,next)=>{
    try {
        const media = await readMedia()
        
    const singleMedia = media.find((m) => m.id == req.params.id);
    if (singleMedia) {
      console.log(singleMedia);
      res.status(200).send(singleMedia);
    } else {
       next(createError(404, `review with id ${req.params.id} not found`))
    }

        
    } catch ({error}) {
        next(error)
    }
    
})
mediaRouter.put("/:id",async(req,res,next)=>{
    try {
        const media = await readMedia();
        const editMediaIndex = media.findIndex(
          (index) => index.id === req.params.id
        )
        const editMedia = media[editMediaIndex];
        const updatedMedia= {
          ...editMedia ,
          ...req.body,
          id: uniqid(),
          createdAt: new Date(),
        };
    
       await  writeMedia(updatedMedia);
       res.send("ok")
      } catch (error) {
        next(error);
      }
    
})
mediaRouter.delete("/:id", async(req,res,next)=>{
    try {
        const media = await readMedia();
        const remainingMedia = media.filter((m) => m.id !== req.params.id)
       await writeMedia(remainingMedia )
        res.status(204).send();
      } catch (error) {
        next(error);
      }
})

//post an poster
mediaRouter.post(
    "/:id/poster",
    multer().single("image"),
    async (req, res, next) => {
      try {
        const fileName = req.file.originalname;
        console.log("File Name", fileName);
  
        const extension = extname(req.file.originalname);
        savePoster(req.params.id + extension, req.file.buffer);
        const media = await readMedia();
        const singleMedia = media.find((image) => image.id === req.params.id);
        const poster = `http://localhost:3001/poster/image/${req.params.id}${extension}`;
        singleMedia.Poster = poster;
  
        const mediaArray = media.filter((m) => m.id !== req.params.id);
        mediaArray.push(singleMedia);
  
        await writeMedia( mediaArray);
  
        res.send("ok");
      } catch (error) {
        next(error);
      }
    }
  );

mediaRouter.post("/:id/reviews",async(req,res,next)=>{
    try {
        const reviews = await readMedia()
        const review = {
            ...req.body,elementId:reviews.id,id:uniqid(),createdAt:new Date()
        }
        reviews.push(review)
        await writeMedia(reviews)
        res.send("reviews created successfully")
        
    } catch (error) {
        next(error)
    }
})

mediaRouter.delete("/:id/reviews",async(req,res,next)=>{
    try {
        const reviews = await readMedia();
        const remainingReviews = reviews.filter((m) => m.id !== req.params.id)
       await writeMedia(remainingReviews )
        res.send("deleted successfully");
    } catch (error) {
        next(error)
    }
})

export default mediaRouter