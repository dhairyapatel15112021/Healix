import axios from "axios";

export const UploadBlog = async (blogData) => {
    let uploadBlogResponse = {error:""};
    if (blogData.title.trim() === ""){
        uploadBlogResponse.error = "! Please Enter Valid Title";
    }
    else if(blogData.description.trim() === ""){
        uploadBlogResponse.error = "! Please Enter Valid Description";
    }
    else if(!blogData.category){
        uploadBlogResponse.error = "! Please Select A Category";
    }
    else{
        try {
            const backendResponse = await axios.post("http://localhost:8080/postBlog",blogData,{
                headers : {Authorization : sessionStorage.getItem("AccessToken")}
            });
                uploadBlogResponse=({...uploadBlogResponse,successPublish:true});
        } catch (err) {
            uploadBlogResponse=({...uploadBlogResponse,error: err.response.data || err.message});
        }
    }
  return (
    uploadBlogResponse
  )
}
