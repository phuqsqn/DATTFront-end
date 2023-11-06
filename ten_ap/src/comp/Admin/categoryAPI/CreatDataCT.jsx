import React from "react";
import { useForm } from "react-hook-form";
import { Link, NavLink, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const CreateCT = (props) => {
  const navagite = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = (data) => {
    props.onSubmit(data);
      navagite('/Admin/categories')
    
  };

  return (
    <>
    <div className="phudz">
      <h1 className="danhhieu">Xin Chào ADMIN <br />
      Vui Lòng Thêm Sản Phẩm Cần Thiết </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <h1 style={{color:'rgb(255, 0, 170)'}}>CREAT ACCOUNT</h1>
        <label>Name</label>
        <br />
        <input
          type="text"
          defaultValue={props.data?.name}
          {...register("name", {
            required: true,
          })}
        />
        {errors.name && <span> không được để trống</span>}

        <br />
        <label>Img:</label>
        <br />
        <input
          type="text"
          defaultValue={props.data?.img}
          {...register("img", {
            required: true,
          })}
        />
        {errors.img && <span> không được để trống</span>}
        <br />
        <button className="creatOK" type="submit" >Creat</button>
        <div>
        <Link style={{color:"pink"}} to="/HomeCategories">Come Back CT-</Link>
        </div>
      </form>
      </div>
    </>
  );
};

export default CreateCT;