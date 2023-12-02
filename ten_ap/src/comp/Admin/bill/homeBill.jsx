import React, { useEffect, useState } from "react";
import httpService from "../../service/http.service";
import { set } from "react-hook-form";
import './oder.css'

const HomeBill = () => {

  const [statistical, setStatistical] = useState("")
  const [isReload, setIsReload] = useState(false)
  const handleUpdateStatusBill = (e, item) => {
    console.log(e.target.value)
    httpService.patch(`/api/oders/${item._id}`,{
      body: {
        is_payment: e.target.value
      }
    }).then(data => {
      setIsReload(!isReload)
    })
  }
  useEffect(() => {
    httpService.get("/api/oders").then(data => {
      console.log(data.data)
      setStatistical(data.data)
    })
  }, [isReload])
  return (
    <>
      <div className="menu_oder">
        <h4>CUSTOMER_NAME</h4>
        <h4>PHONE</h4>
        <h4>ADDRESS</h4>
        <h4>IS_PAYMENT</h4>
        <h4>STATUS</h4>
      </div>
      {statistical && statistical.length > 0 && (
        <div className="itemOder_get">
          {statistical.map((item) => (
            <div className="item_oder" key={item._id}>
              <h4>{item.customer_name}</h4>
              <h4>{item.phone}</h4>
              <h4>{item.address}</h4>
              <h4>{item.is_payment}</h4>
              <h4>
                <select className="select_oder" value={item.is_payment} onChange={(e) => { handleUpdateStatusBill(e, item) }}>
                  <option className="item_select" value={"Browsing"}>Đang Duyệt</option>
                  <option value={"Confirm"}>Xác Nhận</option>
                  <option value={"Success"}>Thành Công</option>
                </select>
              </h4>
            </div>
          ))}
        </div>
      )}
    </>
  )

}
export default HomeBill