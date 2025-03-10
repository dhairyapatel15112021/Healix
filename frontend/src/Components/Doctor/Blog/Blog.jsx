import React, { useEffect, useContext, useState } from 'react';
import './Blog.scss';
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import { Sidebar } from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
import { UploadBlog } from '../../HelperFunction/UploadBlog';
import axios from 'axios';

export const Blog = () => {

  const navigate = useNavigate();
  const { userLoginData, setUserLoginData } = useContext(userContext);
  const [error, SetError] = useState("* All fields are required");
  const [blogHistory, setBlogHisroty] = useState([]);
  const [blogData, setBlogData] = useState({ title: "", description: "", category: "DEFAULT", date: new Date() });

  const getBlogHistory = async () => {
    try {
      const response = await axios.get("http://localhost:8080/doctor/blog", {
        headers: { Authorization: sessionStorage.getItem("AccessToken") }
      });
      const data = response.data.blogs;
      console.log(data);
      setBlogHisroty(data);
    }
    catch (err) {
      console.log(`Error While Geting Blog History ${err}`);
    }
  }
  useEffect(() => {
    getBlogHistory();
    //userLoginData.IsLogin ? navigate("/doctor/blog") : navigate("/login");
    !userLoginData.IsLogin && navigate("/login");
  }, []);

  const handleOnChange = (event) => {
    setBlogData({ ...blogData, [event.target.name]: event.target.value });
  }

  const HandleOnSubmit = async (event) => {
    try {
      event.preventDefault();
      const uploadBlogResponse = await UploadBlog(blogData);
      if (uploadBlogResponse.successPublish) {
        getBlogHistory();
        setBlogData({ title: "", description: "", category: "DEFAULT", date: new Date() });
        SetError("*All fields are required");
        alert("Uploaded Sucessfully");
      }
      else {
        SetError(uploadBlogResponse.error || "Error Occured");
      }
    }
    catch (err) {
      console.log(err);
      console.log("error while uploading The blog");
    }
  }

  const getDate = () => {
    // blogData.date === new Date() , directly this is not working because it compares object refrences not values.
    const today = new Date().toISOString().split("T")[0];
    const blogDate = new Date(blogData.date).toISOString().split("T")[0];
    return today === blogDate ? "Set Upload Date  ( Default Date Is Today )" : blogDate;
  }

  return (
    <div className='blogDiv'>
      <Sidebar />
      <div className="blog">
        <div className="blogText">Blog</div>
        <div className='uploadAndHistory'>
          <div className='uploadDiv'>
            <div className='uploadText'>Upload New Blog</div>
            <form action='#' onSubmit={HandleOnSubmit} className='uploadContentDiv' autoComplete='off'>
              <input type='text' name='title' value={blogData.title} onChange={handleOnChange} placeholder='Title of Blog' className="blogInput titleInput" required></input>
              <textarea type='text' name='description' value={blogData.description} onChange={handleOnChange} placeholder='Description of Blog' className="blogInput descriptionInput" required></textarea>
              <select value={blogData.category} name='category' onChange={handleOnChange} className="blogInput blogSelectInput" required>
                <option value="DEFAULT" disabled>Category of Blog</option>
                <option value="Filter-1">Filter-1</option>
                <option value="Filter-2">Filter-2</option>
                <option value="Filter-3">Filter-3</option>
                <option value="Filter-4">Filter-4</option>
                <option value="Filter-5" >Filter-5</option>
                <option value="None">None</option>
              </select>
              <div className='setDateDiv'>
                <div className='setDateText'>{getDate()}</div>
                <div><DatePicker onChange={(e) => setBlogData({ ...blogData, date: new Date(e) })} render={<Icon />} /></div>
              </div>
              <button type='submit' className='uploadButton'>UPLOAD</button>
            </form>
            <div className='errorDiv'>{error}</div>
          </div>
          <div className='historyDiv'>
            <div className='historyText'>
              Blog History
            </div>
            {
              blogHistory.length === 0 ? <div className='noBlogsHistory'>There Is No Blogs 😔</div> : 
              <div className='historyContentDiv'>
                {
                  blogHistory.map((item)=>{
                    return(
                      <div key={item._id} data-id={item._id} className='content'>
                        <div>{item.title}</div>
                        <div className='modifyButtons'>
                          <div><i className="fa-solid fa-pen-to-square"></i></div>
                          <div><i className="fa-solid fa-trash"></i></div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
