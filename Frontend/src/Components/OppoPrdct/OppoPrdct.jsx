import { useContext } from "react";
import "../CompanyPrdct.css";
import { StoreContext } from "../../Context/context";
import { baseUrl } from "../../ApiCalls/ApiCalls";

export const OppoPrdct = () => {
    let { allItems, cartData, AddToCart, SubFrmCart } = useContext(StoreContext);
    let OppoProducts;
    if (allItems) {
        OppoProducts = allItems.filter((v, i) => { if (v.company === "Oppo") { return v } })
    }
    return (
        <>
            <div className="sngleCompnyPrdct" id="Oppo">
                <div>
                    <h3 className="cmpny-name">Oppo Company</h3>
                    <p>Samsung delivers premium smartphones with brilliant displays, powerful performance, and advanced features. From budget-friendly options to flagship devices, there’s a Samsung for everyone.</p>
                </div>
                <hr></hr>
                {(allItems)
                    ?
                    <div className="prdct-crd-Cont">
                        {
                            (OppoProducts) ?
                                OppoProducts.map((v, i) => {
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