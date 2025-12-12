import axios from "axios";
import { toast } from "react-toastify";
export const baseUrl = "http://localhost:4000";

export const getAllProducts = (setAllItems) => {
    axios.get(`${baseUrl}/get/all/itms`)
        .then((res) => {
            if (res.data.success) {
                setAllItems(res.data.AP);
            } else {
                setAllItems(undefined)
            }
        }).catch((err) => {
            setAllItems(undefined)
        })
}

export const SaveCartData = (data, Items) => {
    if (Items) {
        axios.post(`${baseUrl}/add/cartdata`, { data })
            .then((res) => {
                if (res.data.success) {
                    localStorage.setItem("OdeItn", JSON.stringify(res.data.Ord));
                    window.location.href = "/cart";
                }
            }).catch((err) => {
                toast.error("something went wrong.")
            })
    } else {
        toast.warn("Your cart empty, please select one item")
    }
}

export const getCartData = (orderId, setCart, setOrdrkey) => {
    axios.post(`${baseUrl}/get/cartData`, { orderId })
        .then((res) => {
            if (res.data.success) {
                setCart(res.data.Cd);
                setOrdrkey(res.data.OrdK)
            } else {
                setCart(undefined)
            }
        })
}

export const moveToplaceOrder = (data, subTotal, id, key) => {
    if (id && key) {
        axios.post(`${baseUrl}/proceed/Payment`, { data, Total: subTotal, id, key })
            .then((res) => {
                if (res.data.success) {
                    localStorage.clear();
                    localStorage.setItem("Odetid", JSON.stringify(res.data.Oi));
                    localStorage.setItem("OrdK", JSON.stringify(res.data.OrdK));
                    window.location.href = "/pay"
                } else {
                    toast.error("Invalid Attempt , try again")
                }
            }).catch((err) => {
                toast.error("Eror occured , try again")
            })
    } else {
        toast.error("Invalid Attempt , try again")
    }
}

export const cancalTheOrder = (orderId) => {
    axios.post(`${baseUrl}/cancel/ordr`, { orderId })
        .then((res) => {
            localStorage.clear();
            window.location.href = "/";
        }).catch((err) => {
            toast.error("Something went wrong.")
        });
}

export const AddUserAddress = (Address, image, orderId, ordrKey) => {
    if (image) {
        if (Address.payment !== "Bank Transfer" && image) {
            toast.error("Invalid payment method.")
        } else {
            axios.post(`${baseUrl}/Add/Address/Bt`, { Address, image, orderId, ordrKey }, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }).then((res) => {
                localStorage.clear();
                alert("Your order is completed , you can track your order by calling us or you will be informed via your email.")
                window.location.href = "/";
            }).catch((err) => {
                alert("Something went wrong. Go Back to home page and try again.");
                window.location.reload();
            })
        }
    } else {
        if (Address.payment === "" || Address.payment === "payment method" || !Address.payment || Address.payment === "Bank Transfer") {
            toast.error("Invalid payment method.")
        } else {
            axios.post(`${baseUrl}/Add/Address/Smpl`, { Address, orderId, ordrKey })
                .then((res) => {
                    localStorage.clear();
                    window.location.href = "/";
                    alert("Your order is completed , you can track your order by calling us or you will be informed via your email.")
                }).catch((err) => {
                    window.location.reload();
                })
        }
    }
}