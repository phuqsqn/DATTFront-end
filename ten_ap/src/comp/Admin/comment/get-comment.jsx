import React, { useEffect, useState } from "react";
import httpService from "../../service/http.service";
import { set } from 'react-hook-form';
import Sweetpagination from "sweetpagination";
import "./comment.css"

const Comment = () => {
const [comments , setcomments] = useState ([]);
const [ isReload , setIsReload] = useState (false)
const [currentPageData, setCurrentPageData] = useState([]); //1
const deleteData = async (id) => {
    const response = await httpService.delete(
      `/api/comments/${id}`
    );
  };
const handledeleteData = (id) => {
    deleteData(id);
    setIsReload(!isReload);
  };
useEffect(()=>{
    httpService.get("/api/comments").then(data =>{
        setcomments(data.data)
    })
},[isReload])
    return (<>
      <div className="menuproduct">
          <label htmlFor="">NHIỆM VỤ</label>
          <label htmlFor="">NỘI DUNG</label>
          <label htmlFor="">MÔ TẢ</label>
          <label htmlFor="">MÔ TẢ</label>
        </div>
             <div className="comments">
          {currentPageData &&
            currentPageData.length > 0 &&
            currentPageData.map((item) => (
              <div className="Sum_product" key={item._id}>
                <div className="product_item">
                  <h4>{item.content}</h4>
                </div>
                <div className="product_item">
                  <h4>{item.start}</h4>
                </div>
                <div className="product_item">
                  <h4>{item.product}</h4>
                </div>
                <div className="product_item">
                  <h4>{item.account}</h4>
                </div>
               
                <div>
                    <button className="delcomment"
                    onClick={() => handledeleteData(item._id)}>
                    <img width={"25px"} src="https://www.pngall.com/wp-content/uploads/5/Delete-PNG-Clipart.png" alt=""/>
                    </button>
                </div>
              </div>
            ))}
        </div>
        <div>
        <Sweetpagination
            currentPageData={setCurrentPageData}
            getData={comments}
            dataPerPage={5}
            navigation={true}
            getStyle={"style-1"}
          />
        </div>
    </>)
}
export default Comment;