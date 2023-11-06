import React, { useEffect, useState } from "react";
import httpService from "../service/http.service";
import './product.css'
import { toast } from 'react-toastify';

const UserProducts = () => {
    const [product, setProduct] = useState([])
    const handleAddToCart = (item) => {
        // console.log(item)
        // console.log({
        //     "id_product": item._id,
        //     "quantity": 1
        // })
        httpService.post("/api/carts", {
            body: {
                "id_product": item._id,
                "quantity": 1
            }
        }).then(data => {
            toast.success("Add Thành Công")
        }).catch(error => {
            toast.error(error.message)
        })
    }
    useEffect(() => {
        httpService.get("/api/products/", {})
            .then((data) => {
                setProduct(data.data)
            })
    }, [])
    return (<>

        <div className="Sumproducts">
            {product && product.length > 0 && (
                <div className="item_product">
                    {product.map((item) => (
                        <div className="item" key={item._id}>
                            <h4>{item.name}</h4>
                            <h4> <img className="categoryimg" src={item.img} alt=""
                            /></h4>
                            <h4>{item.price}</h4>
                            <h4>{item.description}</h4>
                            <button onClick={() => handleAddToCart(item)}>add Cart</button>
                        </div>
                    ))}
                </div>
            )}
        </div>

    </>)
}
export default UserProducts;