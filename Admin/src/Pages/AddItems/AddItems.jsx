import { useState } from "react";
import "./AddItems.css"
import { SideNavbar } from "../../Components/SideNav/sidenav.jsx";
import { HeaderComp } from "../../Components/Header/header.jsx";
import { AddProduct } from "../../ApiCalls/ApiCalls.jsx";
import { ToastContainer } from "react-toastify";
export const AddItems = () => {
    let [image, setImage] = useState("");
    let [data, setData] = useState({
        productName: "",
        productCompany: "",
        productNum: "",
        productPrice: ""
    });
    const changeHandler = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setData(prev => ({ ...data, [name]: value }));
    }
    const formSubmission = (e) => {
        e.preventDefault();
        (image) ? data["image"] = image : data;
        let formData = new FormData;
        formData = data;
        AddProduct(formData);
        setData({
            productName: "",
            productCompany: "",
            productNum: "",
            productPrice: ""
        });
        setImage("");
    }
    return (
        <>
            <HeaderComp />
            <ToastContainer />
            <section className="Ad-Sec-Add-Itm Ad-Sec">
                <SideNavbar />
                <form onSubmit={(e) => formSubmission(e)} encType="multipart/form-data" className="Ad-Sec-frm">
                    <div className="formComp">
                        <label htmlFor="image">
                            {(image !== "")
                                ?
                                <>
                                    <img src={URL.createObjectURL(image)} className="previewImg" alt="Item Image"></img>
                                    <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                                </>
                                :
                                <>
                                    <span className="defaultImage">
                                        <p className="uploadSign">📤</p>
                                        <p className="uploadPara">Upload Image</p>
                                        <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                                    </span>
                                </>
                            }
                        </label>
                    </div>
                    <div className="formComp">
                        <p>Product name</p>
                        <input value={data.productName} type="text" placeholder="Burger , Bread etc" onChange={(e) => changeHandler(e)} required className="productInp" name="productName" />
                    </div>
                    <div className="formComp">
                        <p>Products Avaliable</p>
                        <input value={data.productNum} type="number" placeholder="Enter the quantity you have in shop" onChange={(e) => changeHandler(e)} name="productNum" required />
                    </div>
                    <div className="formComp shortInputs-div">
                        <span className="slct-spn">
                            <p>Select Company</p>
                            <select value={data.productCompany}
                                onChange={(e) => changeHandler(e)} name="productCompany">
                                <option>N/A</option>
                                <option>Vivo</option>
                                <option>Oppo</option>
                                <option>Iphone</option>
                                <option>Infinix</option>
                                <option>Samsung</option>
                            </select>
                        </span>
                        <span>
                            <p>Product Price</p>
                            <input value={data.productPrice} placeholder="PKR 10000" name="productPrice" onChange={(e) => changeHandler(e)} type="number" required />
                        </span>
                    </div>
                    <div className="formComp">
                        <button className="Addbtn">Add</button>
                    </div>
                </form>
            </section>
        </>
    )
}