import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { getAllProducts } from "../ApiCalls/ApiCalls";

export const StoreContext = createContext(null);
const ContextProviderFun = (props) => {
    let [allItems, setAllItems] = useState(undefined);
    let [cartData, setCartdata] = useState({});
    let [orderId, setOrderId] = useState(undefined);
    useEffect(() => {
        getAllProducts(setAllItems)
    }, []);

    const AddToCart = (itemId) => {
        if (!cartData[itemId]) {
            setCartdata(prevData => ({ ...prevData, [itemId]: 1 }));
        } else {
            setCartdata(prevData => ({ ...prevData, [itemId]: cartData[itemId] + 1 }));
        }
    }

    const SubFrmCart = (itemId) => {
        if (cartData[itemId]) {
            setCartdata(prevData => ({ ...prevData, [itemId]: cartData[itemId] - 1 }));
        }
    }

    let Itemnumber = 0;

    for (const elem in cartData) {
        if (elem) {
            Itemnumber += cartData[elem]
        } else {
            Itemnumber = 0
        }
    }

    const contextValue = {
        allItems,
        cartData,
        AddToCart,
        SubFrmCart,
        Itemnumber,
        setCartdata,
        orderId,
        setOrderId
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default ContextProviderFun;