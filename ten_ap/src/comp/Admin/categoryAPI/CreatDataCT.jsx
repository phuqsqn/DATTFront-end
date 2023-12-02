import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './creatCate.css'
import { dark } from "@mui/material/styles/createPalette";



const CreateCT = (props) => {
  const navagite = useNavigate();
  const [image, setImage] = useState(null);
  const [name, setName] = useState("")



  const handleSubmit = (e) => {
    e.preventDefaut()
    console.log({
      name: name,
      img: image,
    })
    props.onSubmit({
      name: name,
      img: image,
    }).then(data=>{
      navagite('/Admin/categories')
    })
  };

  return (
    <>
      <div className="phudz">
        <form className="creatCate" onSubmit={(e) => handleSubmit(e)}>
          <h1 style={{ color: 'rgb(255, 0, 170)' }}>CREAT CATEGORY</h1>
          <label>Name</label>
          <br />
          <input
            placeholder="Enter your name"
            type="text"
            defaultValue={props.data?.name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <label>Img:</label>
          <br />
          <input type="file"
            onChange={(e) => setImage(e.target.files[0])} />
          <br /> <br />
          <button className="creatOK" type="submit" >Creat</button>
          <Link className="comeback" to="/Admin/categories">Come Back CT-</Link>
        </form>
      </div>
    </>
  );
};

export default CreateCT;