export const UploadBlog = async (blogData) => {
    let uploadBlogResponse = {error:""};
    console.log(blogData.title);
    if (blogData.title === " "){
        uploadBlogResponse.error = "! Please Enter Valid Title";
    }
    else if(blogData.description === " "){
        uploadBlogResponse.error = "! Please Enter Valid Description";
    }
    else if(!blogData.category){
        uploadBlogResponse.error = "! Please Select A Category";
    }
    else{
        console.log(blogData.date);
        try {
            const backendResponse = await fetch("http://localhost:8080/postBlog", {
                method: "POST",
                body: JSON.stringify(blogData),
                headers: {
                    "Content-Type": "application/json",
                    "authorization": sessionStorage.getItem("AccessToken"),
                },
            });
            const backendResponseData = await backendResponse.json();
            if (backendResponse.ok) {
                console.log(backendResponseData);
                uploadBlogResponse=({...uploadBlogResponse,successPublish:true});
            } else {
                throw new Error(backendResponseData.authenticateTokenError || backendResponseData.Error);
            }
        } catch (err) {
            uploadBlogResponse=({...uploadBlogResponse,error:err.message});
        }
    }
  return (
    uploadBlogResponse
  )
}
