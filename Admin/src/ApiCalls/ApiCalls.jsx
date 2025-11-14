import axios from "axios";
import { toast } from "react-toastify";

export const baseUrl = "http://localhost:4000";


// Api call to add item to db by Admin via Admin Panel:
export const AddProduct = (data) => {
    axios.post(`${baseUrl}/Ad/prdct/Add`, data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then((res) => {
        if (res.data.success) {
            toast.success(res.data.message)
        } else {
            toast.error(res.data.message)
        }
    }).catch((err) => {
        toast.error("Something went wrong.")
    })
}

// Api call to GET All item from db by Admin:
export const getAllItems = (setItems) => {
    axios.get(`${baseUrl}/Ad/prdct/All`)
        .then((res) => {
            if (res.data.success) {
                setItems(res.data.AP)
            } else {
                setItems(undefined)
            }
        }).catch((err) => {
            toast.error("Something went wrong.")
        })
}

// Api Call to delete the item
export const delItmByAdm = (image, id) => {
    axios.post(`${baseUrl}/del/prdct/Admn`, { image, id })
        .then((res) => {
            if (res.data.success) {
                window.location.reload();
            } else {
                toast.error(res.data.message)
            }
        })
}

// Api call to GET all Orders
export const getAllOrders = (setOrders) => {
    axios.get(`${baseUrl}/Ad/ordrs/all`)
        .then((res) => {
            if (res.data.success) {
                setOrders(res.data.Os)
            } else {
                setOrders(undefined)
            }
        }).catch((err) => {
            setOrders(undefined);
        })
}

// Appi Call to DELETE Order fro Order Colllection (Ocll);
export const delOrdrbyAdm = (orderId, image) => {
    if (image) {
        axios.post(`${baseUrl}/Ad/del/ordr`, { orderId, image })
            .then((res) => {
                if (res.data.success) {
                    window.location.reload();
                } else {
                    toast.error("Something went wrong");
                }
            })
    } else {
        axios.post(`${baseUrl}/Ad/del/ordr`, { orderId })
            .then((res) => {
                if (res.data.success) {
                    window.location.reload();
                } else {
                    toast.error("Something went wrong");
                }
            })
    }
}
