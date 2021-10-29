import express from "express"
import listEndpoints from "express-list-endpoints";
import mediaRouter from "./media/media.js"
import cors from "cors";
import {join} from "path"
import reviewsRouter from "./media/reviews.js"


const imageFolderPath = join(process.cwd(),"./public")


const server = express()
server.use(cors())
server.use(express.json())
server.use(express.static(imageFolderPath))

server.use("/media",mediaRouter)
server.use("/reviews",reviewsRouter)


const port = process.env.PORT
console.table(listEndpoints(server))

server.listen(port,()=>
    console.log("successfully running on port:",port))

server.on('error', (err) => console.log(err))