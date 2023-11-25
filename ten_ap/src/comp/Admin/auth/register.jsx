import React, { useState } from "react";
import httpService from "../../service/http.service";
import storageService from "../../service/storage.service";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import "./auths.css"
import { Link } from "react-router-dom";

const Register2 = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [dob, setdob] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const handleOnSubmit = (e) => {
    e.preventDefault();

    //validate inp
    if(username === null || username === ""){
      toast.error("User name Không được để trống")
      return
    }
    if(username.length <= 2){
      toast.error("Username Quá Ngắn")
      return
    }
    if (username >= 20) {
      toast.error("Username Quá Dài")
      return
    }
    if(!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)){
      toast.error("Password không hợp lệ")
      return
    }
    if(fullname === null || fullname === ""){
      toast.error("Fullname Không được để trống")
      return
    }
    if(fullname.length <= 3){
      toast.error("fullname Quá Ngắn")
      return
    }
    if (fullname >= 40) {
      toast.error("fullname Quá Dài")
      return
    }
    if(dob === null || dob === ""){
      toast.error("Dob Không được để trống")
      return
    }
    if(phone === null || phone === ""){
      toast.error(" Phone Không Được Để Trống")
      return
    }
    if( phone.length < 9 || phone.length > 11){
      toast.error("Phone Không Hợp Lệ")
      return
    }
    httpService
      .post("/api/auth/register", {
        body: { username, password, fullname, dob, phone },
      })
      .then(data => {
        navigate('/Login');
        toast.success("Đăng Ký Thành Công");
       console.log(data)

      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
      
  };
  return (
    <>
    <div className="SumAuths">
      <form
        onSubmit={handleOnSubmit}
        className="register__form"
        // style={{ margin: "auto", textAlign: "center" }}
      >
        <img className="authImg" src="https://goldidea.vn/upload/123/thiet-ke-logo-the-face-shop.png" alt="" />
        <h3>Sign Up</h3>
        <div className="form__iteam">
          <label>Username :</label> <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
           
          />
          
        </div>
        

        <div className="form__iteam">
          <label>Password :</label><br />
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          
          />
        </div>
        <div className="form__iteam">
          <label>Fullname :</label><br />
          <input
            type="text"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            placeholder="Enter your fullname"
            
          />
        </div>
        <div className="form__iteam">
          <label>Dob :</label><br />
          <input
            type="text"
            value={dob}
            onChange={(e) => setdob(e.target.value)}
            placeholder="Enter your dob"
           
          />
        </div>
        <div className="form__iteam">
          <label>Phone :</label><br />
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone"
           
          />
        </div>

        <div className="form__item">
          <button
            type="submit"
            className="authsbutton"
          >
            SIGN UP
          </button>
        </div>
        <div className="linkLogin">
        Do not have an account?<Link className="phu123" to={"/Login"}> Sign In</Link>
        </div>
      </form>
      </div>
    </>
  );
};
export default Register2;
