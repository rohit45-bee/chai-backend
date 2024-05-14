import {v2 as cloudinary} from "cloudinary"
import exp from "constants";
import fs from "fs"

cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARU_API_KEY,
        api_secret: process.env.CLOUDINARU_API_SECRET
    });

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        console.log("file is uploaded on the cloudinary",response.url);
        return response;

    } catch(error){
        fs.unlinkSync(localFilePath) //remves locally saved temp file as the upload file got failed
        return null;
    }
}
    
const uploadResult = await cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg", {
    public_id: "shoes"
}).catch((error)=>{console.log(error)});

console.log(uploadResult);
 
export {uploadOnCloudinary}