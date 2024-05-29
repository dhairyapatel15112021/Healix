const blog = require("../Database/Models/BlogModel");

const postBlog = async (req,res)=>{
    try{
        console.log(req.body.name);
        const newBlog = new blog({name:req.body.name,doctorId:req.body.id,description:req.body.description,category:req.body.category,
        title:req.body.title,dateCreated:req.body.date});
        const savedNewBlog = await newBlog.save();
        res.status(200).json({ publishBlog: savedNewBlog });
    }
    catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

const getBlog = async(req,res) =>{
    try{
        const Todaydate = new Date();
        const AllBlogs = await blog.find({dateCreated: { $lte: Todaydate }}).sort({dateCreated: -1});
        res.status(200).json({allBlogs:AllBlogs});
    }
    catch (error) {
        res.status(500).json({ Error: error.message });
    }
}

module.exports = {
    postBlogMethod : postBlog,
    getBlogMethod : getBlog,
}