// import v2 from cloudinary
// but we import v2  as a name cloudinary  
import { v2 as cloudinary } from 'cloudinary';
// import fs model from node js that is used to manage file system 
import fs, { access } from 'fs';
import { fileURLToPath } from 'url';



// cloudinary config file that accept some basic congig vaiable or key that we already get from cloudinary
cloudinary.v2.config({
    // here is our cloudinary space name that we access from .env file  here we put all our files 
    cloud_name: process.env.CLOUDINARY_NAME,
    // this is our cloudinary api key that we access from .env file 
    api_key: process.env.CLOUDINARY_API_KEY,
    // this is our cloudinary api secret key that we access from .env file 
    api_secret: process.env.CLOUDINARY_API_SECRET
});



// this is our file uploader function that accept local file path that we provide it 
const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null;
        // upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        });
        // File has been uploaded successfully and we see in console what he get from cloudinary 
        console.log('File has been uploaded on cloudinary ', response.url);
        // return whole response that we get from cloudinay after successfully file upload so user can access what he want from response 
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) //remove tha locally saved temporary file as the upload operation got failed
        return null;
    }
}


export { uploadOnCloudinary };