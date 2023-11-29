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
    const [isReload, setisReload] = useState(false)
    const [open, setOpen] = React.useState(false);
    const [saveAccount, setSaveAccount] = useState({customer_name:"",phone:"",address:""});
    const handleClose = () => setOpen(false);
    const handleOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        httpService.post("/api/oders").then(data =>{
            console.log(data)
            setSaveAccount({customer_name:"",phone:"",address:""})
            handleClose();
            setisReload(!isReload)
            toast.success("Thanh Toán Thành Công")
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
                <Fade style={{ width: "420px", height: "500px", border: "0px", borderRadius: "5px" }} in={open}>
                    <Box sx={style}>
                        <button style={{ margin: "0px" }} onClick={() => setOpen(false)}>x</button>
                        <div className="slog"><h1 className="dis">Oder</h1></div> <br />
                        <form className="formedit" onSubmit={handleSubmit}>
                            <label className="Boxname">Customer_name</label> <br />
                            <input className="inpedit" type="text" value={saveAccount?.customer_name} onChange={e => setSaveAccount({ ...saveAccount, customer_name: e.target.value })} /><br />
                            <label className="Boxname">phone</label><br />
                            <input className="inpedit" type="text" value={saveAccount?.phone} onChange={e => setSaveAccount({ ...saveAccount, phone: e.target.value })} /><br />
                            <label className="Boxname">address</label><br />
                            <input className="inpedit" type="text" value={saveAccount?.address} onChange={e => setSaveAccount({ ...saveAccount, address: e.target.value })} /><br />
                            <button className="submitedit" type="submit">Xác Nhận</button>
                            {products && products.length > 0 && (
                    <div className="item_cart">
                        {products.map((item) => (
                            <div className="product_cart" key={item._id}>
                                <h4>{item.product.name}</h4>
                                <img className="img_cart" src={item.product.img} alt=""
                                />
                                <h4>{item.product.price}</h4>
                                <h4>{item.quantity}</h4>
                                <button className="add_cart" onClick={() => handleDeleteProducts(item.product._id)}>Delete</button>

                            </div>
                        ))}
                        <h4>Tổng Sản Phẩm: {totalProducts}</h4>
                        <button onClick={() => handleOpen()}>Thanh Toán</button>
                    </div>
                )}
                        </form>
                    </Box>
                </Fade>
            </Modal>
            <div className="sum_cart">
                {products && products.length > 0 && (
                    <div className="item_cart">
                        {products.map((item) => (
                            <div className="product_cart" key={item._id}>
                                <h4>{item.product.name}</h4>
                                <img className="img_cart" src={item.product.img} alt=""
                                />
                                <h4>{item.product.price}</h4>
                                <h4>{item.quantity}</h4>
                                <button className="add_cart" onClick={() => handleDeleteProducts(item.product._id)}>Delete</button>

                            </div>
                        ))}
                        <h4>Tổng Sản Phẩm: {totalProducts}</h4>
                        <button onClick={() => handleOpen()}>Thanh Toán</button>
                    </div>
                )}
            </div>
            <div>

            </div>
        </>
    )

}
export default CartUse;