import React, { useEffect, useState } from "react";
import httpService from "../service/http.service";
import { toast } from "react-toastify";
import { set } from "react-hook-form";
import './cart.css';
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import storageService from "../service/storage.service";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
};

const CartUse = () => {
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    const [isReload, setisReload] = useState(false)
    const [cartId, setCartId] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [saveAccount, setSaveAccount] = useState({ customer_name: "", phone: "", address: "" });
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        setOpen(true);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        httpService.post("/api/oders", {
            body: {
                ...saveAccount,
                payment: "On Delivery",
                is_payment: "Browsing",
                accounts: storageService.get("account_id"),
                cart: cartId
            }

        }).then(data => {
            setSaveAccount({ customer_name: "", phone: "", address: "" })
            handleClose();
            setisReload(!isReload)
            toast.success("Đặt hàng Thành Công")
        })

    }

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
                if (data || data?.data) {
                    setProducts(data?.data?.items)
                    const listProduct = data?.data?.items
                    let prices = 0;
                    setCartId(data?.data?._id)
                    let total = 0;
                    for (let i = 0; i < listProduct?.length; i++) {
                        total += listProduct[i]?.quantity
                        prices += + listProduct[i]?.product?.price
                    }
                    setTotalPrice(prices)
                    setTotalProducts(total)
                } else {
                    toast.success("Ban Khong Co San Pham Nao")
                }

            })
    }, [isReload])
    return (
        <>
          

            <div className="sum_cart">
                {products && products.length > 0 && (
                    
                    <div className="item_cart">
                    <div className="Sum">
                     <h1>CART PRODUCTS</h1>
                    </div>
                        <div className="Name_Cart">
                            <h4>Tên Sản Phẩm</h4>
                            <span>Image</span>
                            <h4>Price</h4>
                            <h4>Số Lượng</h4>
                        </div>
                        {products.map((item) => (
                            <div className="product_cart" key={item._id}>
                                <h4>{item?.product?.name}</h4>
                                <span> <img className="img_cart" src={item?.product?.img} alt=""
                                /></span>
                                <h4>{item?.product?.price}</h4>
                                <h4>{item?.quantity}</h4>
                                <button className="delete_cart" onClick={() => handleDeleteProducts(item?.product?._id)}>Delete</button>

                            </div>
                        ))}
                        <h4 className="Sum_product_item">Tổng Sản Phẩm: {totalProducts}</h4>

                        <button className="OnclickOder" onClick={() => handleOpen()}>Oder Products</button>
                    </div>
                )}
            </div>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                        backdrop: {
                            timeout: 500,
                        },
                    }}
                >
                    <Fade style={{ width: "800px", height: "450px", border: "0px", borderRadius: "5px" }} in={open}>
                        <Box sx={style}>
                            <button style={{ margin: "0px" }} onClick={() => setOpen(false)}>x</button>
                            <div className="slog"><h1 className="dis">Oder</h1></div> <br />
                            <div className="Sum_cartOder">
                                <form className="formOder" onSubmit={handleSubmit}>
                                    <label className="lableOder">CUSTOMER_NAME:</label> <br />
                                    <input className="inpOder" type="text" value={saveAccount?.customer_name} onChange={e => setSaveAccount({ ...saveAccount, customer_name: e.target.value })} /><br />
                                    <label className="lableOder">PHONE:</label><br />
                                    <input className="inpOder" type="text" value={saveAccount?.phone} onChange={e => setSaveAccount({ ...saveAccount, phone: e.target.value })} /><br />
                                    <label className="lableOder">ADDRESS:</label><br />
                                    <input className="inpOder" type="text" value={saveAccount?.address} onChange={e => setSaveAccount({ ...saveAccount, address: e.target.value })} /><br />
                                    <button className="submitedit" type="submit">Xác Nhận</button>
                                </form>
                                <div className="sum_oder">
                                    <div className="cart_name" >
                                        <h4>Name</h4>
                                        <h3>Price</h3>
                                        <h3>Quantity</h3>
                                    </div>
                                    {products && products.length > 0 && (
                                        <div item_oders>
                                            {products.map((item) => (
                                                <div className="cart_oder" key={item._id}>
                                                    <h4>{item?.product?.name}</h4>
                                                    <h3>{item?.product?.price}</h3>
                                                    <h3>{item?.quantity}</h3>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    <h1 >Tổng : {totalPrice} đ</h1>
                                </div>
                            </div>
                        </Box>
                    </Fade>
                </Modal>
            </div>

        </>
    )

}
export default CartUse;