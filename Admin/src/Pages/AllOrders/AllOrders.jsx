import { useEffect } from "react";
import { HeaderComp } from "../../Components/Header/header";
import { SideNavbar } from "../../Components/SideNav/sidenav";
import "./AllOrders.css";
import { useState } from "react";
import { baseUrl, delOrdrbyAdm, getAllOrders } from "../../ApiCalls/ApiCalls";
export const OrdersPage = () => {
    let [Orders, setOrders] = useState(undefined);
    useEffect(() => {
        getAllOrders(setOrders)
    }, []);
    return (
        <>
            <HeaderComp />
            <section className="Ad-Sec">
                <SideNavbar />
                <div className="ordr-head-cont">
                    {(Orders)
                        ?
                        Orders.map((v, i) => {
                            return (
                                <fieldset key={i}>
                                    <legend className="legend">🛍 . {i + 1}</legend>
                                    <div className="AddressDiv">
                                        <p>{v.userAdd["name"]}</p>
                                        <p>{v.userAdd["email"]}</p>
                                        <p>{v.userAdd["phone"]}</p>
                                        <p>{v.userAdd["address"]}</p>
                                        <div className="btnsDiv">
                                            <button className="ordrBtns" onClick={() => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${v.userAdd["email"]}&su=${encodeURIComponent("Order Info")}`)}>
                                                Email Now
                                            </button>
                                            <button className="ordrBtns" onClick={() => window.location.href = `tel:${v.userAdd["phone"]}`}>
                                                Call Now
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        {v.data.map((j, i) => {
                                            return (
                                                <span key={i}>
                                                    <p>{j.name} x {j.quantity}</p>
                                                    <p >{j.price}x {j.quantity} = {j.price * j.quantity}</p>
                                                </span>
                                            )
                                        })}
                                    </div>
                                    <div>{v.Total}</div>
                                    <div>
                                        {v.scriptImg
                                            ?
                                            <>
                                                <b>Payment Method</b>
                                                <a href={`${baseUrl}/$rpt/${v.scriptImg}`}>
                                                    <img src={`${baseUrl}/$rpt/${v.scriptImg}`} />
                                                </a>
                                                <p>Click the Image to review</p>
                                                <button className="ordrBtns delBtn" onClick={() => delOrdrbyAdm(v.orderId, v.scriptImg)}>Delete Order</button>
                                            </>
                                            :
                                            <>
                                                <b>Payment Method</b>
                                                <p>{v.userAdd["payment"]}</p>
                                                <b>Date : </b>
                                                <p>{new Date(v.Date).toISOString().split("T")[0]}</p>
                                                <button className="ordrBtns delBtn" onClick={() => delOrdrbyAdm(v.orderId)}>Delete Order</button>
                                            </>
                                        }
                                    </div>
                                </fieldset>
                            )
                        })
                        :
                        <h3>
                            Orders doesn't Exsist;
                        </h3>}
                </div>
            </section>
        </>
    )
}