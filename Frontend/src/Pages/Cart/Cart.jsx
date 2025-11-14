import { useContext, useEffect, useState } from "react";
import { Navbar } from "../../Components/Navbar/navbar";
import "./Cart.css";
import { baseUrl, getCartData, moveToplaceOrder } from "../../ApiCalls/ApiCalls";
import { toast, ToastContainer } from "react-toastify";
export const CartPage = () => {
    let orderId = JSON.parse(localStorage.getItem("OdeItn"));
    let [cart, setCart] = useState(undefined);
    let [ordrKey, setOrdrkey] = useState(undefined);
    // Dummy State just for the purpose of updation:
    let [update, setUpdate] = useState(undefined);
    useEffect(() => {
        if (orderId) {
            getCartData(orderId, setCart, setOrdrkey);
        } else {
            window.location.href = "/";
        }
    }, []);
    let subTotal = 0;
    const updateCard = (id, Action) => {
        let newArr = cart.filter((v, i) => {
            if (v.id === id) {
                return v;
            }
        });
        (Action === "Add") ? newArr[0].quantity += 1 : newArr[0].quantity -= 1;
        setUpdate(newArr);
    }
    return (
        <>
            <header>
                <ToastContainer />
                <Navbar />
            </header>
            <main id="cartMain">
                <section id="cartSec">
                    <div className="RowsCont">
                        <div className="itemRow headerRow">
                            <b className="rowElem">Image/Name</b>
                            <b className="rowElem">Quantity</b>
                            <b className="rowElem">Price</b>
                            <b className="rowElem">price*Qunatity</b>
                            <b className="rowElem">Actions</b>
                        </div>
                        {(cart)
                            ?
                            cart.map((v, i) => {
                                return (
                                    <div className="itemRow" key={i}>
                                        <span className="rowElem imgAndName">
                                            <b className="title">Image/Name : </b>
                                            <div>
                                                <img src={`${baseUrl}/pr0ducts/${v.image}`} />
                                                <b>{v.name}</b>
                                            </div>
                                        </span>
                                        <div className="rowElem">
                                            <b className="title"> Quantity : </b>
                                            <p>{(v.quantity > v.number) ? v.number : v.quantity}</p>
                                        </div>
                                        <div className="rowElem">
                                            <b className="title"> price/Item : </b>
                                            <p>{v.price}</p>
                                        </div>
                                        <div className="rowElem">
                                            <b className="title"> Total Price : </b>
                                            <p>{(v.quantity > v.number) ? v.number : v.quantity * v.price}</p>
                                        </div>
                                        <p hidden>{subTotal = subTotal + (v.quantity * v.price)}</p>
                                        <span className="rowElem Actions">
                                            {(v.quantity === 0) ? window.location.reload() : <></>}
                                            <b className="title">Actions : </b>
                                            <div>
                                                <button className="minus" onClick={() => { updateCard(v.id, "Sub") }}>-</button>
                                                <button className="plus" onClick={() => { (v.quantity >= v.number) ? toast.warning("Maximum quantity selected") : updateCard(v.id, "Add") }}>+</button>
                                            </div>
                                        </span>
                                    </div>
                                )
                            })
                            :
                            <div className="emptyCartDiv">
                                <b>Your Cart is Empty </b><a href="/">Start Shopping</a>
                            </div>
                        }
                        <div className="btnDiv">
                            <button onClick={() => { (subTotal === 0) ? window.location.href = ("/") : moveToplaceOrder(cart, subTotal , orderId , ordrKey) }}>Proceed To Cheeckout</button>
                        </div>
                    </div>
                    <div className="SubTotalHeadDiv">
                        <h2>Cart Sub Total:</h2>
                        <div className="subTotaldives upperSubDiv">
                            <p>Cart Amount</p>
                            <p>PKR {subTotal}</p>
                        </div>
                        <div className="subTotaldives">
                            <p>Delivery Charges </p>
                            <p>PKR 350</p>
                        </div>
                        <div className="subTotaldives">
                            <b>Total</b>
                            <p> {(cart)
                                ?
                                <b>PKR {subTotal + 350}</b>
                                :
                                <></>
                            }</p>
                        </div>
                    </div>
                </section>
            </main >
        </>
    )
}