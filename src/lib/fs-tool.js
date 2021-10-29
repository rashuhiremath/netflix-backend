import fs from "fs-extra"
import {fileURLToPath} from "url";
import {join, dirname} from "path";
const {readJSON,writeJSON,writeFile,createReadStream}= fs

const mediaJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/media.json")
const reviewsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../data/reviews.json")
//const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data")
  const imageFolderPath = join(process.cwd(),"./public/poster/image")

   // const blogJSONPathCsv = join( blogsJSONPath , "blogs.json")

export const readMedia = () => readJSON( mediaJSONPath)
export const writeMedia = content => writeJSON( mediaJSONPath, content) // content is array

export const readReviews =()=>readJSON(reviewsJSONPath)
export const writeReviews = content => writeJSON( reviewsJSONPath, content)
export const savePoster = (filename,buffer) =>{
    writeFile(join(imageFolderPath,filename),buffer)}

//export const getBooksReadableStream = () => createReadStream(blogJSONPathCsv)





