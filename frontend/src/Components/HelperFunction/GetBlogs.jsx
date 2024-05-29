export const GetBlogs = async () => {
  let blogResponse = {error:""};
  try{
      const backendResponse = await fetch("http://localhost:8080/getBlog", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
      });
      const backendResponseData = await backendResponse.json();
      if (backendResponse.ok) {
          blogResponse=({...blogResponse,blogData:backendResponseData.allBlogs});
      } else {
          throw new Error(backendResponseData.Error);
      }
  }
  catch(err){
      blogResponse=({...blogResponse,error:err.message});
  }
  return blogResponse;
}
