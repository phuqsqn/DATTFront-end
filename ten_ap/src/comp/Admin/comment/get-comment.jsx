import React, { useEffect, useState } from "react";
import httpService from "../../service/http.service";
import { set } from 'react-hook-form';
import Sweetpagination from "sweetpagination";

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
             <div className="">
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
                    <button onClick={() => handledeleteData(item._id)}>Delete</button>
                </div>
              </div>
            ))}
            <div>
        <Sweetpagination
            currentPageData={setCurrentPageData}
            getData={comments}
            dataPerPage={5}
            navigation={true}
            getStyle={"style-1"}
          />
        </div>
        </div>
    </>)
}
export default Comment;