import { useContext } from "react";
import "../CompanyPrdct.css";
import { StoreContext } from "../../Context/context";
import { baseUrl } from "../../ApiCalls/ApiCalls";

export const VivoPrdct = () => {
    let { allItems, cartData, AddToCart, SubFrmCart } = useContext(StoreContext);
    let vivoProducts;
    if (allItems) {
        vivoProducts = allItems.filter((v, i) => { if (v.company === "Vivo") { return v } })
    }
    return (
        <>
            <div className="sngleCompnyPrdct" id="Vivo">
                <div>
                    <h3 className="cmpny-name">Vivo Company</h3>
                    <p>Vivo brings innovation to your fingertips with sleek designs, stunning displays, and powerful cameras. Perfect for those who love style, performance, and cutting-edge technology in one device.</p>
                </div>
                <hr></hr>
                {(allItems)
                    ?
                    <div className="prdct-crd-Cont">
                        {
                            (vivoProducts) ?
                                vivoProducts.map((v, i) => {
                                    return (
                                        <div key={i} className="cmpny-Prdct-Crd">
                                            <img src={`${baseUrl}/pr0ducts/${v.image}`} alt="prdctImg" className="prdctImg" />
                                            <div className="desc-div">
                                                <div className="nameAndcompany">
                                                    <b>{v.name}</b>
                                                    <p className="cmpnyName">{v.company}</p>
                                                </div>
                                                <p>PKR-{v.price}</p>
                                                {(cartData[v.id] ?
                                                    <div className="cuntr-div">
                                                        <button className="Sub" onClick={() => SubFrmCart(v.id)}>-</button>
                                                        <p>{cartData[v.id]}</p>
                                                        <button className="Add" onClick={() => AddToCart(v.id)}>+</button>
                                                    </div>
                                                    :
                                                    <></>
                                                )}
                                            </div>
                                            <div className="prdctQntty">
                                                Product Quantity : {v.number}
                                            </div>
                                            <button className="AddToCartBtn" onClick={() => AddToCart(v.id)}>🛒</button>
                                        </div>
                                    )
                                })
                                :
                                <></>
                        }
                    </div>
                    :
                    <div className="lodr-cont">
                        <div className="lodr">
                        </div>
                    </div>
                }
            </div >
        </>
    )
}