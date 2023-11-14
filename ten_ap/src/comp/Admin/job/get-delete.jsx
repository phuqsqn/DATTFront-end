import React, { useEffect, useState } from "react";
import httpService from "../../service/http.service";
import { Link } from "react-router-dom";
import "./job.css"
import Sweetpagination from "sweetpagination";


const HomeJob = () => {
  const [data, setData] = useState([]);
  const [job, setJob] = useState(null);
  const [dataProduct, setProduct] = useState([]);
  const [productAll, setProductALl] = useState([]);
  const [isReload, setIsReload] = useState(false)
  const [textSeach, setTextSeach] = useState("");
  const [Alljobs, setAllJobs] = useState([]);
  const [currentPageData, setCurrentPageData] = useState([]); //1
  const deleteJob = async (id) => {
    const response = await httpService.delete(
      `/api/jobs/${id}`
    )
  }
  const handledeleteJobs = (id) => {
    deleteJob(id);
    setIsReload(!isReload)
  }
  useEffect(() => {
    let newArray = [];
    for (let item of productAll) {
      if (item.name.toLowerCase().includes(textSeach.toLowerCase())) {
        newArray.push(item)
      }
    }
    setAllJobs(newArray)
  }, [textSeach])

  useEffect(() => {
    httpService.get("/api/jobs").then((data) => {
      setProductALl(data.data)
      setAllJobs(data.data)
    })
  }, [isReload])

  useEffect(() => {
    httpService
      .get("/api/accounts", {})
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (job !== null) {
      httpService
        .get(`/api/jobs/${job}`)
        .then((data) => setProduct(data.data));
    }
    console.log(job);
  }, [job]);
  return (
    <>
      <div>
        <div className="menuproduct">
          <label htmlFor="">NHIỆM VỤ</label>
          <label htmlFor="">NỘI DUNG</label>
          <label htmlFor="">MÔ TẢ</label>
          <label className="items" htmlFor="">
            {" "}
            <input type="text" placeholder="Tìm Kiếm Jobs " onChange={(e) => setTextSeach(e.target.value)} />
            {/* <select className="Selecter" onChange={(e) => setJob(e.target.value)}>
              {data.map((item) => (
                <option key={item.id} value={item._id}>
                  {item.username}
                </option>
              ))}
            </select> */}
          </label>
        </div>
        <div className="">
          {currentPageData &&
            currentPageData.length > 0 &&
            currentPageData.map((item) => (
              <div className="Sum_product" key={item._id}>
                <div className="job_item">
                  <h4>{item.name}</h4>
                </div>
                <div className="job_item">
                  <h4>{item.detail}</h4>
                </div>
                <div className="job_item">
                  <h4>{item.status}</h4>
                </div>
                <div>
                  <button className="deljob" onClick={() => handledeleteJobs(item._id)}>
                  <img
              width={"7"}
              src="https://banner2.cleanpng.com/20190725/pwz/kisspng-calculate-icon-delete-icon-multiplication-icon-5d3a46888531f0.7270433015641002325456.jpg"
              alt=""
            />
                  </button>
                </div>
              </div>
            ))}
            <br></br>
        </div>
        <Link className="Creatjob" to="/Createjobs">Creat Job</Link>
        <div>
        <Sweetpagination
            currentPageData={setCurrentPageData}
            getData={Alljobs}
            dataPerPage={5}
            navigation={true}
            getStyle={"style-1"}
          />
        </div>
      </div>
    </>
  );
};
export default HomeJob;