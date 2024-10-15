import React, { useState,useEffect } from 'react';
import './Blogs.scss';
import img from '../../../Assets/Doctor_With_BG.jpg'
import { SetTextToEllipsis } from '../../HelperFunction/SetTextToEllipsis';
import { GetBlogs } from '../../HelperFunction/GetBlogs';
import { GetDateFormat } from '../../HelperFunction/GetDateFormat';

export const Blogs = () => {
    const [allblogs,setAllBlogs] = useState([])
    const [blogData,setBlogData] = useState([]);
    const filterData = (filterValue) =>{
        if (filterValue==="All"){
            setBlogData(allblogs);
            return;
        }
        const data = allblogs.filter((item)=>{
            return item.category===filterValue;
        });
        setBlogData(data);
    }
    useEffect(() => {
      const getBlogs = async()=>{
        try{
            const blogResponse = await GetBlogs();
            if(blogResponse.blogData){
                setBlogData(blogResponse.blogData);
                setAllBlogs(blogResponse.blogData);
            }
        }
        catch(error){
            console.log("Error While Getting All Posts");
        }
      }
      getBlogs();
    }, [])
    

    
    return (
            <div className='blogs' style={{height : blogData.length===0 ? "75vh" :"90vh"}}>
                <div className='blogsText'>Explore Our Blogs</div>
                <div className='filterButtonsDiv'>
                    <button className='filterButton' onClick={()=> filterData("All")}>All</button>
                    <button className='filterButton' onClick={()=> filterData("Filter-1")}>Fliter-1</button>
                    <button className='filterButton' onClick={()=> filterData("Filter-2")} >Fliter-2</button>
                    <button className='filterButton' onClick={()=> filterData("Filter-3")}>Fliter-3</button>
                    <button className='filterButton' onClick={()=> filterData("Filter-4")}>Fliter-4</button>
                    <button className='filterButton' onClick={()=> filterData("Filter-5")}>Fliter-5</button>
                </div>
                {
                    blogData.length===0 ? 
                    <div className='noBlogs'>There Is No Blogs 😔</div> 
                    :
                    <div className='blogsContent'>
                    {
                        blogData.map((item, index) => {
                            return (
                                <div className='blogsCard' key={index}>
                                    <div className='blogsHeader'>
                                        <img src={img} className='doctorImage' alt="Doctor Profile" />
                                        <div className='NameAndDateDiv'>
                                            <div className='name'>{item.name}</div>
                                            <div className="date">{item.dateCreated ? GetDateFormat(item.dateCreated) : ""}</div>
                                        </div>
                                        <div className='category'>{item.category}</div>
                                    </div>
                                    <div className='blogsTitle'>{item.title}</div>
                                    <div className='blogsDescription'>{SetTextToEllipsis(item.description)}</div>
                                </div>
                            )
                        })
                    }
                </div>
                }
            </div>
    )
}
