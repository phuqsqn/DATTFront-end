import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import httpService from "../../service/http.service";
import { useNavigate } from "react-router-dom";


const CreateJobs = () => {
  const [accounts, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null)
  const navagite = useNavigate();

  useEffect(() => {
    httpService.get('/api/accounts').then((data) => {
      setCategories(data.data)
    })
  }, [])
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = (data) => {
    httpService
    .post(`/api/jobs/${categoryId}`, { body: data })
    .then(data => setCategoryId(data))
    navagite('/Admin/job')

  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 style={{ color: 'rgb(255, 0, 170)' }}>CREAT ACCOUNT</h1>

        <select className="Selecter" onChange={(e) => setCategoryId(e.target.value)}>
          {accounts.map((item) => (
            <option key={item._id} value={item._id}>
              {item.username}
            </option>
          ))}
        </select>
        <br></br>
        <label>Name</label>
        <br />
        <input
          type="text"
          defaultValue={""}
          {...register("name", {
            required: true,
          })}
        />
        {errors.name && <span style={{color: "red"}}> không được để trống</span>}

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
        {errors.detail && <span style={{color: "red"}}> không được để trống</span>}
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
        {errors.status && <span style={{color: "red"}}> không được để trống</span>}
        <br />
        <button className="creatOK" type="submit" >Creat</button>
        <div>

        </div>
      </form>
    </>
  );
};
export default CreateJobs;