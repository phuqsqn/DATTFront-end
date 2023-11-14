import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import httpService from "../../service/http.service";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null)

  useEffect(() => {
    httpService.get('/api/categories').then((data) => {
      setCategories(data.data)
    })
  }, [])
  console.log(categories)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = (data) => {
    httpService.post(`/api/products/${categoryId}`, { body: data }).then(data => console.log(data))
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ color: 'rgb(255, 0, 170)' }}>CREAT ACCOUNT</h1>

        <select className="Selecter" onChange={(e) => setCategoryId(e.target.value)}>
          {categories.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>

        <label>Name</label>
        <br />
        <input
          type="text"
          defaultValue={""}
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
          defaultValue={""}
          {...register("img", {
            required: true,
          })}
        />
        {errors.img && <span> không được để trống</span>}
        <br />
        <label>price</label>
        <br />
        <input
          type="text"
          defaultValue={""}
          {...register("price", {
            required: true,
          })}
        />
        {errors.price && <span> không được để trống</span>}
        <br />
        <label>description</label>
        <br />
        <input
          type="text"
          defaultValue={""}
          {...register("description", {
            required: true,
          })}
        />

        {errors.description && <span> không được để trống</span>}
        <br />
        <button className="creatOK" type="submit" >Creat</button>
        <div>

        </div>
      </form>
    </>
  );
};
export default CreateProduct;
