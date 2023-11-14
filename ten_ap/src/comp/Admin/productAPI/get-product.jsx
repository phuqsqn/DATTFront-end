import React, { useEffect, useState } from "react";
import httpService from "../../service/http.service";
import "./product.css";
import { Link, useNavigate } from "react-router-dom";
import Sweetpagination from "sweetpagination";

const HomeProduct = () => {
  const navagite = useNavigate();
  const [data, setData] = useState([]);
  const [category, setCategory] = useState(null);
  const [dataProduct, setProduct] = useState([]);
  const [isReload, setIsReload] = useState(false)
  const [productAll, setProductALl] = useState([]);
  const [textSeach, setTextSeach] = useState("");
  const [productAllfilter, setProductALlfilter] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]); //1
  const deleteProduct = async (id) => { 
    const response = await httpService.delete(
      `/api/products/${id}`
    )
  }
  useEffect(() => {
    let newArray = [];
    for (let item of productAll) {
      if (item.name.toLowerCase().includes(textSeach.toLowerCase())) {
        newArray.push(item)
      }
    }
    setProductALlfilter(newArray)
  }, [textSeach])

  const handledeleteproduct = (id) => {
    deleteProduct(id);
    setIsReload(!isReload)
  }
  useEffect(() => {
    httpService.get("/api/products").then((data) => {
      setProductALl(data.data)
      setProductALlfilter(data.data)
    })
  }, [isReload])
  // useEffect(() => {
  //   httpService
  //     .get("/api/categories", {})
  //     .then((data) => {
  //       setData(data.data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, [isReload]);
  useEffect(() => {
    if (category !== null) { 
      httpService
        .get(`/api/products/${category}`)
        .then((data) => setProduct(data.data));
    }
    console.log(category);
  }, [category]);
  return (
    <>
      <div>
        <div className="menuproduct">
          <label htmlFor="">NAME</label>
          <label htmlFor="">IMG</label>
          <label htmlFor="">PRICE</label>
          <label htmlFor="">description</label>
          <label className="items" htmlFor="">
            {" "}
            <input type="text" placeholder="nhap vao day" onChange={(e) => setTextSeach(e.target.value)} />
            {/* <select className="Selecter" onChange={(e) => setCategory(e.target.value)}>
              {data.map((item) => (
                <option key={item.id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select> */}
          </label>
        </div>
        <div className="">
          {currentPageData &&
            currentPageData.length > 0 &&
            currentPageData.map((item) => (
              <div className="Sum_product" key={item._id}>
                <div className="product_item">
                  <h4>{item.name}</h4>
                </div>
                <div className="product_item">
                <img className="categoryimg" src={item.img} alt=""

/>
                </div>
                <div className="product_item">
                  <h4>{item.price}</h4>
                </div>
                <div className="product_item">
                  <h4>{item.description}</h4>
                </div>
                <div className="product_item">
                  <button className="delproduct" onClick={() => handledeleteproduct(item._id)}> <img
              width={"7"}
              src="https://banner2.cleanpng.com/20190725/pwz/kisspng-calculate-icon-delete-icon-multiplication-icon-5d3a46888531f0.7270433015641002325456.jpg"
              alt=""
            /></button>
                </div>
              </div>
            ))}
        </div>
        <div>
        <br></br>
        <Link className="creatProduct"  to="/CreateProducts">Creat Product</Link>
        <div>
        <Sweetpagination
            currentPageData={setCurrentPageData}
            getData={productAllfilter}
            dataPerPage={5}
            navigation={true}
            getStyle={"style-1"}
          />
        </div>
        </div>
      </div>
    </>
  );
};
export default HomeProduct;
