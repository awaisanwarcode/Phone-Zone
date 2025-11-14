import { useContext } from "react";
import "../CompanyPrdct.css";
import { StoreContext } from "../../Context/context";
import { baseUrl } from "../../ApiCalls/ApiCalls";

export const IphonePrdct = () => {
    let { allItems, cartData, AddToCart, SubFrmCart } = useContext(StoreContext);
    let IphoneProducts;
    if (allItems) {
        IphoneProducts = allItems.filter((v, i) => { if (v.company === "Iphone") { return v } })
    }
    return (
        <>
            <div className="sngleCompnyPrdct" id="Iphone">
                <div>
                    <h3 className="cmpny-name">Iphone Company</h3>
                    <p>iPhone combines luxury, innovation, and unmatched performance. With top-tier security, seamless usability, and cutting-edge technology, it’s the smartphone that sets the standard worldwide.</p>
                </div>
                <hr></hr>
                {(allItems)
                    ?
                    <div className="prdct-crd-Cont">
                        {
                            (IphoneProducts) ?
                                IphoneProducts.map((v, i) => {
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
            </div>
        </>
    )
}