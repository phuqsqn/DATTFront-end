import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import httpService from "../service/http.service";
import { Button } from '@mui/material/Button';
import storageService from "../service/storage.service";
import './productDetail.css'

const ProductDetail = () => {
    const [product, setProduct] = useState({})
    const [comments, setComments] = useState([])
    const [commentContent, setCommentContent] = useState("")
    const [ isReload , setisReload] = useState(false)
    const { id } = useParams()

    const handleOnSubmit = (e) => {
        e.preventDefault()
        console.log(commentContent)
        // console.log({
        //     content: commentContent,
        //     account: storageService.get("account_id")
        // })
        httpService.post(`/api/comments/${id}`, {
            body:{
                content: commentContent,
                account: storageService.get("account_id"),
                start: "Hello"
            }
        }).then(data =>{
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

        <div className="Sumproducts">
            <div className="" >
                <h3>{product?.name}</h3>
                <h4> <img className="" src={product?.img} alt=""
                /></h4>
                <h2>{product?.price}</h2>
                <h5 className="quantity">{product?.description}</h5>
                <button className="add_cart">+ Add Cart</button>
            </div>
            {comments &&
                comments.length > 0 &&
                comments.map((item) => (
                    <div className="" key={item._id}>
                        <div className="product_item">
                            <h4>{item.content}</h4>
                        </div>
                        <div className="product_item">
                            <h4>{item.account}</h4>
                        </div>
                    </div>
                ))}
        </div>
        <div>
            <form onSubmit={handleOnSubmit}>
                <input onChange={e => setCommentContent(e.target.value)} value={commentContent} type="text" />
                <button type="submit">Enter</button>
            </form>
        </div>
    </>)
}
export default ProductDetail;