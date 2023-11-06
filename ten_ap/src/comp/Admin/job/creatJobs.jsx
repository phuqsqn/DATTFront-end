import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import httpService from "../../service/http.service";

const CreateJobs = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null)

  useEffect(() => {
    httpService.get('/api/products').then((data) => {
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
    console.log(data)
    console.log(categoryId)
    httpService.post(`/api/jobs/${categoryId}`, { body: data }).then(data => console.log(data))
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
        <label>detail</label>
        <br />
        <input
          type="text"
          defaultValue={""}
          {...register("detail", {
            required: true,
          })}
        />
        <br />
        <label>status</label>
        <br />
        <input
          type="text"
          defaultValue={""}
          {...register("status", {
            required: true,
          })}
        />
        <br />
        {errors.img && <span> không được để trống</span>}
        <br />
        <button className="creatOK" type="submit" >Creat</button>
        <div>

        </div>
      </form>
    </>
  );
};
export default CreateJobs;