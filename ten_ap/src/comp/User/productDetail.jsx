import React, { useEffect, useState } from "react";
import { useParams, Link } from 'react-router-dom';
import httpService from "../service/http.service";
import { Button } from '@mui/material/Button';
import storageService from "../service/storage.service";
import './productDetail.css'
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';

const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const [comments, setComments] = useState([])
    const [commentContent, setCommentContent] = useState("")
    const [isReload, setisReload] = useState(false)
    const [listAccount, setListAccount] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        httpService.get('/api/accounts').then((data) => {
            setListAccount(data.data)
            console.log(data.data)
        })
    }, [])
    const getAccountName = (id) => {
        for (let i = 0; i < listAccount.length; i++) {
            if (listAccount[i]._id === id) {
                return listAccount[i].fullname
            }
        }
        return id;
    }
    const handleAddToCart = (id) => {
        // console.log(item)
        // console.log({
        //     "id_product": item._id,
        //     "quantity": 1
        // })
        httpService.post("/api/carts", {
            body: {
                "id_product": id,
                "quantity": 1
            }
        }).then(data => {
            toast.success("Add Thành Công")
        }).catch(error => {
            toast.error(error.message)
        })
    }

    const handleLogOut = () => {
        storageService.remove("role")
        storageService.remove("access_token")
        navigate('/login')

    }
    const { id } = useParams()

    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(commentContent)
        // console.log({
        //     content: commentContent,
        //     account: storageService.get("account_id")
        // })
        httpService.post(`/api/comments/${id}`, {
            body: {
                content: commentContent,
                account: storageService.get("account_id"),
                start: "Hello"
            }
        }).then(data => {
            setisReload(!isReload)
            setCommentContent("")
        })
    }
    useEffect(() => {
        httpService.get(`/api/products/detail/${id}`).then(data => {
            setProduct(data.data)
            console.log(data.data)
        })
    }, [])
    useEffect(() => {
        httpService.get("/api/comments").then(data => {
            setComments(data.data.filter(item => item.product === id))
            console.log(data.data.filter(item => item.product === id))
        })
    }, [isReload])
    return (<>
        <div className="Sum_index">
            <div className="header_index">
                <div className="menu_header">
                    <div className="item_productt">
                        <h5><Link className="auth" to='/login'>Login</Link></h5>
                    </div>
                    <div className="item_productt" >
                        <h5><Link className="auth" to='/register'>Register</Link></h5>
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
                    <div className="item_product"><a>Phone</a></div>
                </div>
            </div>
            <div className="menu_index">
                <img
                    className="logo_index"
                    width={"190px"}
                    src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png"
                    alt=""
                />
                <ul>
                    <li><Link to="/">TRANG CHỦ</Link></li>
                    <li><Link to="/product">SẢN PHẨM</Link></li>
                    <li>TIN TỨC</li>
                    <li><Link to="/statistical">THỐNG KÊ</Link></li>
                </ul>
                <Link className="cart" to='/cart'><img
                    width={"50px"}
                    height={"50px"}
                    src="https://cdn.pixabay.com/photo/2017/03/29/04/09/shopping-icon-2184065_1280.png"
                    alt=""
                /></Link>
            </div>
            <div className="imgdetail">
                <img className="imgdetail_img" src="https://img4.thuthuatphanmem.vn/uploads/2020/12/25/anh-bia-bo-my-pham-fob_094444611.jpg" alt=""
                />
            </div>
            <div style={{ background: "rgb(212, 212, 212)" }} className="Sumproducts">
                <div className="text_product">
                    <div className="sum_detail">
                        <div className="detail_left">
                            <img width={"350px"} className="" src={product?.img} alt=""
                            />
                        </div>
                        <div className="detail_right">
                            <h2>{product?.name}</h2>
                            <h4>{product?.price}</h4>
                            <div className="add">
                                <button className="add_cart" onClick={() => handleAddToCart(product._id)}>+ Add Cart</button>
                            </div>
                            <div className="descript">
                                <h5 className="quantity">{product?.description}</h5>
                            </div>

                        </div>
                    </div>
                    <div className="name_comment">
                        <h1>Comment Khách Hàng</h1>
                        <hr />
                    </div>
                    <div className="detail_footer">
                        {comments &&
                            comments.length > 0 &&
                            comments.map((item) => (
                                <div className="show_comment" key={item._id}>
                                    <div className="product_detail">
                                        <h3>{getAccountName(item.account)}</h3>
                                    </div>
                                    <div className="product_detail">
                                        <h4>{item.content}</h4>
                                    </div>
                                </div>

                            ))}

                    </div>

                    <div className="creat_comment">
                        <hr />
                        <form onSubmit={handleOnSubmit}>
                            <input className="inp_comment" onChange={e => setCommentContent(e.target.value)} value={commentContent} type="text" />
                            <button className="enter_comment" type="submit">Enter</button>
                        </form>
                    </div>
                </div>
            </div>
            <h2 className="tieude">ĐỐI TÁC</h2>
            <div className="doitac">

                <div className="menu_doitac">
                    <img
                        width={"150px"}
                        src="https://png.pngtree.com/png-clipart/20200727/original/pngtree-abstract-modern-floral-cosmetics-logo-template-vector-logo-for-business-and-png-image_5375383.jpg"
                        alt=""
                    />
                </div>
                <div className="menu_doitac">
                    <img
                        width={"150px"}
                        src="https://png.pngtree.com/png-clipart/20231001/original/pngtree-luxury-perfume-cosmetic-logo-for-business-and-shops-vector-png-image_12930249.png"
                        alt=""
                    />
                </div>
                <div className="menu_doitac">
                    <img
                        width={"150px"}
                        src="https://png.pngtree.com/png-vector/20190927/ourmid/pngtree-abstract-flowers-garden-logo-png-image_1753053.jpg"
                        alt=""
                    />
                </div>
                <div className="menu_doitac">
                    <img
                        width={"150px"}
                        src="https://thegioibienquangcao.com/wp-content/uploads/2018/10/logo-my-pham-9.jpg"
                        alt=""
                    />
                </div>
                <div className="menu_doitac">
                    <img
                        width={"150px"}
                        src="https://inbienquangcao.vn/wp-content/uploads/2021/11/thiet-ke-logo-my-pham-12_1584438209.jpg"
                        alt=""
                    />
                </div>

            </div>
            <br></br>
            <div className="hover_logo">
                <ul>
                    <li><Link to="https://www.facebook.com/profile.php?id=100054721666294">   <img
                        width={"35px"}
                        src="https://i.pinimg.com/474x/16/b8/22/16b82240a640db6fb6c18297fc1dcfd3.jpg"
                        alt=""
                    /></Link></li>
                    <li><Link to="https://www.facebook.com/profile.php?id=100054721666294">   <img
                        width={"35px"}
                        src="https://thumbs.dreamstime.com/z/youtube-logo-icon-voronezh-russia-november-square-black-color-164586300.jpg?w=768"
                        alt=""
                    /></Link></li>
                    <li><Link to="https://www.facebook.com/profile.php?id=100054721666294">   <img
                        width={"35px"}
                        src="https://thumbs.dreamstime.com/z/twitter-logo-bird-isolated-over-white-background-social-media-networking-communications-symbol-breaking-news-130861855.jpg?w=768"
                        alt=""
                    /></Link></li>
                    <li><Link to="https://www.facebook.com/profile.php?id=100054721666294">   <img
                        width={"35px"}
                        src="https://brasol.vn/wp-content/uploads/2022/09/logo-instagram-vector.jpg"
                        alt=""
                    /></Link></li>
                </ul>
            </div>
            <div className="footer_index">
                <div className="logo">
                    <img
                        width={"280px"}
                        src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png"
                        alt=""
                    />
                    <h4>Địa Chỉ : <span>219/7 Trần Hưng Đạo TP.Đà Nẵng</span></h4>
                    <h4>Số Điện Thoại: <span>0349090947</span></h4>
                    <h4>Email : <span>Huynhngocphuqs@gmai.com</span></h4>
                    <h4>Mở cửa từ 8:00 AM đến 9:00 PM tất cả các ngày trong tuần</h4>

                </div>
                <div className="menu">
                    <h3>MENU</h3>
                    <ul>
                        <li><Link className="menu_li">Trang chủ</Link></li>
                        <li><Link className="menu_li">Sản Phẩm</Link></li>
                        <li><Link className="menu_li">Tin Tức</Link></li>
                        <li><Link className="menu_li">Liên Hệ</Link></li>
                    </ul>
                </div>
                <div className="menu"><h3>DANH MỤC</h3></div>
                <div className="menu"><h3>DỊCH VỤ</h3></div>
            </div>
            <div className="footer_hover">
                <p>Coppy.@huynhngocphuqs@gmail.com</p>
            </div>
        </div>


    </>)
}
export default ProductDetail;