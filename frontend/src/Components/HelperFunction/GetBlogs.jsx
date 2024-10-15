import axios from "axios";

export const GetBlogs = async () => {
  let blogResponse = { error: "" };
  try {
    const backendResponse = await axios.get("http://localhost:8080/getBlog");
    const data = backendResponse.data;
    blogResponse = ({ ...blogResponse, blogData: data.allBlogs });
  }
  catch (err) {
    blogResponse = ({ ...blogResponse, error: err.response.data || err.message });
  }
  return blogResponse;
}
