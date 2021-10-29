import express from "express"
import listEndpoints from "express-list-endpoints";
import mediaRouter from "./media/media.js"
import cors from "cors";
import {join} from "path"
import reviewsRouter from "./media/reviews.js"


const imageFolderPath = join(process.cwd(),"./public")


const server = express()


const whitelist = [process.env.FE_LOCAL_URL,process.env.FE_PROD_URL]// 
const corsOpts = {
  origin: function (origin, next) {
   
    console.log("CURRENT ORIGIN: ", origin)
    if (!origin || whitelist.indexOf(origin) !== -1) {
      
      next(null, true)
    } else {
     
      next(new Error("CORS ERROR"))
    }
  },
}

server.use(cors(corsOpts))
server.use(express.json())
server.use(express.static(imageFolderPath))


server.use("/media",mediaRouter)
server.use("/reviews",reviewsRouter)



const port = process.env.PORT


console.table(listEndpoints(server))

server.listen(port,()=>
    console.log("successfully running on port:",port))

server.on('error', (err) => console.log(err))