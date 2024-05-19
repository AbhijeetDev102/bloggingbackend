const cloudnary = require("cloudinary").v2;
const blogSchema = require("../models/blogs");

function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
  }

  async function uploadFileToCloudinary(file, folder, quality) {
    const options = { folder };
  
    if (quality) {
      options.quality = quality;
    }
  
    options.resource_type = "auto";
    return await cloudnary.uploader.upload(file.tempFilePath, options);
  }


exports.uploadBlogs = async (req, res)=>{
    try{
        const blogImg = req.files.imageFile;
        console.log(blogImg)

        const {title, description, content, category } = req.body;
        console.log({
            title,
            description,
            content,
            category
        });
        //validation

        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = blogImg.name.split(".")[1].toLowerCase();
    
        if (!isFileTypeSupported(fileType, supportedTypes)) {
          return res.status(400).json({
            success: false,
            message: "file format not supported",
          });
        }

        const respone = await uploadFileToCloudinary(blogImg, "naveenCode");
        console.log(respone);
        
        await blogSchema.create({
            blogImage:respone.secure_url,
            title,
            description,
            content,
            category
        })

        return res.status(200).json({
            success: true,
            message: "Blog Created Successfully",
          });

    }catch(err){
        console.log(err.message)
        return res.status(500).json({
          success: false,
          message: "Internal server error",
        });
    }
}