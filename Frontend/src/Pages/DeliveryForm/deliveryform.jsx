import { toast, ToastContainer } from "react-toastify";
import "./deliveryform.css";
import { useState } from "react";
import { AddUserAddress, cancalTheOrder } from "../../ApiCalls/ApiCalls";

export const DeliveryForm = () => {
    let [image, setImage] = useState(undefined);
    let orderId = JSON.parse(localStorage.getItem("Odetid"));
    let [paymentPage, setPaymentpage] = useState("Cash On Delivery");
    let [ordrKey, setOrdrkey] = useState(JSON.parse(localStorage.getItem("OrdK")));
    localStorage.removeItem("OrdK");
    let [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postal: "",
        payment: ""
    });
    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData(prev => ({ ...prev, [name]: value }))
    }

    const formSubmission = (e) => {
        e.preventDefault();
        (!image) ? image = undefined : image;
        if (orderId, ordrKey) {
            AddUserAddress(data, image, orderId, ordrKey)
        } else {
            toast.warning("Invalid attempt , try again");
        }
    }
    return (
        <>
            <ToastContainer />
            <header>
            </header>
            <main className="container">
                <section className="card">
                    <div className="brand">
                        <div className="logo">OD</div>
                        <div>
                            <h1>Order Delivery Form</h1>
                            <p className="lead">Fast — Reliable — Trackable. Fill the details below to place your delivery order.</p>
                        </div>
                    </div>

                    <form onSubmit={(e) => formSubmission(e)}>
                        <div className="row">
                            <div className="col">
                                <label htmlFor="name">Full name</label>
                                <input id="name" name="name" type="text" placeholder="Jane Doe" value={data.name} onChange={(e) => changeHandler(e)} required />
                            </div>
                            <div className="col">
                                <label htmlFor="phone">Phone</label>
                                <input id="phone" name="phone" type="tel" min={10} placeholder="+92 300 0000000" value={data.phone} onChange={(e) => changeHandler(e)} required />
                            </div>
                        </div>

                        <div className="col">
                            <label htmlFor="email">Email</label>
                            <input id="email" name="email" type="email" placeholder="jane@example.com" value={data.email} onChange={(e) => changeHandler(e)} />
                        </div>

                        <label htmlFor="address">Delivery address</label>
                        <textarea id="address" name="address" placeholder="Street, Building, Floor, Landmark" value={data.address} onChange={(e) => changeHandler(e)} required></textarea>

                        <div className="row">
                            <div className="col">
                                <label htmlFor="city">City</label>
                                <input id="city" name="city" type="text" placeholder="Karachi" value={data.city} onChange={(e) => changeHandler(e)} />
                            </div>
                            <div className="col">
                                <label htmlFor="postal">Postal / ZIP</label>
                                <input id="postal" name="postal" type="text" placeholder="74200" value={data.postal} onChange={(e) => changeHandler(e)} />
                            </div>
                        </div>

                        <div className="col">
                            <label htmlFor="payment">Payment method</label>
                            <select id="payment" name="payment" value={data.payment} onChange={(e) => { setPaymentpage(e.target.value); changeHandler(e) }}>
                                <option>payment method</option>
                                <option>Cash on Delivery</option>
                                <option>Self Pick</option>
                                <option>Bank Transfer</option>
                            </select>
                        </div>

                        {(paymentPage === "Bank Transfer")
                            ?
                            <>
                                <label htmlFor="image">
                                    {(image)
                                        ?
                                        <>
                                            <img src={URL.createObjectURL(image)} className="scriptImg"></img>
                                            <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                                        </>
                                        :
                                        <>
                                            <span className="defaultImage">
                                                <p className="uploadSign">📤</p>
                                                <p className="uploadPara">Upload Transcript</p>
                                            </span>
                                            <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                                        </>
                                    }
                                </label>
                            </>
                            :
                            <></>
                        }

                        <div className="flex-row">
                            <input id="terms" type="checkbox" required />
                            <label htmlFor="terms" className="small">I agree to the delivery terms and conditions.</label>
                        </div>

                        <div className="ODfooter">
                            <div className="small">Need help? Call +92 300 0000000</div>
                            <div className="button-group">
                                <div type="reset" className="secondary" onClick={() => cancalTheOrder(orderId)} >Go Back</div>
                                <button type="submit" className="btn">Place Order</button>
                            </div>
                        </div>
                        {(paymentPage === "Bank Transfer") ?
                            <div>
                                <div className="medium">EasyPaisa Account : +92 300 0000000</div>
                                <div className="medium">Bank Account : 9090-3000-0000-0000</div>
                            </div>
                            :
                            <></>
                        }
                    </form>
                </section>

                <aside className="summary card">
                    <h3>Delivery Description</h3>
                    <div className="line"><span className="small">Estimated delivery</span><span className="small">2–3 days</span></div>
                    <div className="line"><span className="small">Delivery fee</span><span className="small">PKR 350</span></div>
                    <div className="line"><span className="small">Tax</span><span className="small">PKR 0</span></div>
                    <div className="total"><span>Total</span><span>PKR 350</span></div>
                    <div className="divider"></div>
                    <div>
                        <strong>Pickup</strong>
                        <div className="small">From: ShoesShop , F-8 , Islamabad , Pakistan</div>
                    </div>

                    <div>
                        <strong>Deliver to</strong>
                        <div className="small">Form Address (Review form data)</div>
                    </div>
                </aside>
            </main>
        </>
    )
}