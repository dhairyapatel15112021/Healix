import React, { useEffect, useContext, useState } from 'react';
import './Blog.scss';
import DatePicker from "react-multi-date-picker";
import Icon from "react-multi-date-picker/components/icon";
import { Sidebar } from '../Sidebar/Sidebar';
import { ToggleButton } from '../../OuterComponents/Header/ToggleButton/ToggleButton';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../../App';
import { UploadBlog } from '../../HelperFunction/UploadBlog';
export const Blog = () => {
  const navigate = useNavigate();
  const { userLoginData, setUserLoginData } = useContext(userContext);
  const [ date, setDate ] = useState(new Date());
  const [error, SetError] = useState("* All fields are required");
  const [blogData, setBlogData] = useState({});
  useEffect(() => {
    userLoginData.IsLogin ? navigate("/doctor/blog") : navigate("/login");
  }, [userLoginData.IsLogin]);
  const handleOnChange = (event) => {
    setBlogData({ ...blogData, [event.target.name]: event.target.value });
  }
  const HandleOnSubmit = async (event) => {
    try {
        event.preventDefault();
        const uploadBlogResponse = await UploadBlog({ ...blogData, date:date,name:userLoginData.Name,id:userLoginData.UserId });
        if (uploadBlogResponse.error) {
            SetError(uploadBlogResponse.error);
            return;
        }
        setBlogData({});
    }
    catch (err) {
        console.log(err);
        console.log("error while uploading The blog");
    }
}

  return (
    <div className='blogDiv'>
      <Sidebar />
      <ToggleButton />
      <div className="blog">
        <div className="blogText">Blog</div>
        <div className='uploadAndHistory'>
          <div className='uploadDiv'>
            <div className='uploadText'>Upload New Blog</div>
            <form action='#' onSubmit={HandleOnSubmit} className='uploadContentDiv' autoComplete='off'>
              <input type='text' name='title' onChange={handleOnChange} placeholder='Title of Blog' className="blogInput titleInput" required></input>
              <textarea type='text' name='description' onChange={handleOnChange} placeholder='Description of Blog' className="blogInput descriptionInput" required></textarea>
              <select name='category' onChange={handleOnChange} className="blogInput blogSelectInput" required>
                <option selected disabled hidden>Category of Blog</option>
                <option>Filter-1</option>
                <option>Filter-2</option>
                <option>Filter-3</option>
                <option>Filter-4</option>
                <option>Filter-5</option>
                <option>None</option>
              </select>
              <div className='setDateDiv'>
                <div className='setDateText'>Set Upload Date  ( Default Date Is Today )</div>
                <div><DatePicker onChange={(e) => setDate(new Date(e))} render={<Icon />} /></div>
              </div>
              <button type='submit' className='uploadButton'>UPLOAD</button>
            </form>
            <div className='errorDiv'>{error}</div>
          </div>
          <div className='historyDiv'>
            <div className='historyText'>
              Blog History
            </div>
            <div>
              Under Maintenance
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
