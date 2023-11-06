import React, { useEffect, useState } from "react";
import httpService from "../service/http.service";
import { toast } from "react-toastify";
import { set } from "react-hook-form";

const CartUse = () => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0)
    const [isReload, setisReload] = useState (false)
    const handleDeleteProducts = (id) => {
        console.log(id)
        httpService.delete(`/api/carts/${id}`)
            .then(data => {
                toast.success("Thành Công")
                setisReload(!isReload)
            })
            .catch(error => {
                toast.error("Không Thành Công");
            })
    }
    // useEffect(()=>{
    //     httpService.get("/api/carts").then(data =>{
    //         console.log(data)
    //     })
    // },[])
    useEffect(() => {
        httpService.get("/api/carts", {})
            .then(data => {
                console.log(data.data.items)
                setProducts(data.data.items)
                let total = 0;
                for (let i = 0; i < data.data.items.length; i++) {
                    total += data.data.items[i].quantity
                }
                setTotalProducts(total)
            })
    }, [isReload])
    return (
        <>

            <div>
                {products && products.length > 0 && (
                    <div className="item_product">
                        {products.map((item) => (
                            <div className="item" key={item._id}>
                                <h4>{item.product.name}</h4>
                                <h4> <img className="categoryimg" src={item.product.img} alt=""
                                /></h4>
                                <h4>{item.product.price}</h4>
                                <h4>{item.quantity}</h4>
                                <button onClick={() => handleDeleteProducts(item.product._id)}>Delete</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div>
                <h4>{totalProducts}</h4>
                <button>Thanh Toán</button>
            </div>
        </>
    )

}
export default CartUse;