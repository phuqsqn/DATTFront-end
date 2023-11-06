import React, { useEffect, useState } from "react";
import httpService from "../service/http.service";
import UserProducts from "./product";
import HomeProduct from "../Admin/productAPI/get-product";
import './index.css'
import '../../img/z4815540120478_0c12c358ffeb3fd46e8d9cd93b71ba7c.jpg';
import storageService from "../service/storage.service";
import { useNavigate } from "react-router";
import Register from './../react-form/register';
import { Link } from "react-router-dom";


const User = () => {
    const [product, setProduct] = useState([])
    const navigate = useNavigate();

    const handleLogOut = () => {
        storageService.remove("role")
        storageService.remove("access_token")
        navigate('/login')
        
    }

    useEffect(() => {
        httpService.get("/api/products/", {})
            .then((data) => {
                setProduct(data.data)
            })
    }, [])

    return (<>
        <div className="Sum_index">
            <div className="header_index">
                <div className="menu_header">
                    <div className="item_productt">
                        <h5>Login</h5>
                    </div>
                    <div className="item_productt" >
                        <h5>Register</h5>
                    </div>
                    <div className="item_productt">
                        {
                            storageService.get("role") &&
                            <h5 onClick={handleLogOut}>logout</h5>
                        }
                    </div>
                </div>
                <div className="menu_header2">
                  <div className="item_product"><a>message</a></div>
                  <div className="item_product"><a>Email</a></div>
                  <div className="item_product"><a>Số Điện Thoại</a></div>
                </div>
            </div>
            <div>
                <Link to = '/cart'>Cart</Link>
            </div>
            <div className="nav_index">
                {<UserProducts />}
            </div>
            <div className="footer_index"></div>
        </div>



    </>)
}
export default User;