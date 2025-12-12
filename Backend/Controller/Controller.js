import { MongoClient } from "mongodb";
import * as fun from "../Functions/Functions.js";
import fs from "fs";
import path from "path";
const client = new MongoClient(process.env.DB_URL);
const db = client.db(process.env.DB);
const PColl = db.collection(process.env.P_C);
const OColl = db.collection(process.env.O_C);

//%%%%%%%%%% ADMIN PANEL 🤵 CONTROLLER %%%%%%%%%%\\
// I used Short Words Like "enc" for "encrypted form of it's Suffix";

// Function that help to add Item to Product Collection (PColl) by Admin
export const AddProduct = async (req, res) => {
    try {
        let id = await fun.idGen(PColl);
        await PColl.insertOne({ id, name: req.body.productName, company: req.body.productCompany, number: req.body.productNum, price: req.body.productPrice, image: req.file.filename });
        res.json({ success: true, message: "Product added Successfully" });
    } catch (error) {
        res.json({ success: false, message: "Error Occured" });
    }
}

// Function that help to All Items exsist in PColl; 
export const GetAllPrdct = async (req, res) => {
    try {
        let AP = await PColl.find().toArray();
        res.json({ success: true, AP });
    } catch (error) {
        res.json({ success: false, message: "Error Occured" });
    }
}

// Function that helpp to delte Item from PColl;
export const delItmByAdm = async (req, res) => {
    try {
        fs.unlinkSync(`${path.resolve("Products")}/${req.body.image}`);
        await PColl.deleteOne({ id: req.body.id });
        await fun.correctingSeries(PColl);
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false, message: "Something went wrong." })
    }
}

// Function that help to GET all orders:
export const GetAllOrdrs = async (req, res) => {
    await OColl.deleteMany({ userAdd: undefined });
    try {
        let AllOrders = await OColl.find().toArray();
        res.json({ success: true, Os: AllOrders });
    } catch (error) {
        res.json({ success: false })
    }
}

// Function that help to DELETE orders from OColl;
export const delOrdrByAdm = async (req, res) => {
    let image = req.body.image
    if (!image) {
        await OColl.deleteMany({ orderId: req.body.orderId });
        res.json({ success: true });
    } else {
        fs.unlinkSync(`${path.resolve("Scripts")}/${req.body.image}`);
        await OColl.deleteMany({ orderId: req.body.orderId });
        res.json({ success: true });
    }
}

//%%%%%%%%%% USER CONTROLLER %%%%%%%%%%\\

//Function that to create new entry in Orders-Collection (OColl);
export const AddCartData = async (req, res) => {
    try {
        let orderId = await fun.idGen(OColl);
        let encOrder_Id = fun.encryptdata(orderId);
        let data = req.body.data;
        await OColl.insertOne({ data, orderId });
        res.json({ success: true, Ord: encOrder_Id });
    } catch (error) {
        res.json({ success: false });
    }
}

//Function that help to GET cart data of user to display in cart page:
export const getCartData = async (req, res) => {
    try {
        let orderId = fun.getEncrptdDta(req.body.orderId);
        let [cartData] = await OColl.find({ orderId: orderId.data }).toArray();
        if (cartData) {
            let orderKey = fun.GenOrderKey();
            let encOrder_Key = fun.encryptdata(orderKey);
            await OColl.updateOne({ orderId: orderId.data }, { $set: { "orderKey": orderKey } });
            let cartDataArr = [];
            let object = cartData.data;
            let allItems = await PColl.find().toArray();
            allItems.map((v, i) => {
                if (object[String(i + 1)]) {
                    v["quantity"] = object[String(i + 1)];
                    cartDataArr.push(v);
                }
            })
            res.json({ success: true, Cd: cartDataArr, OrdK: encOrder_Key });
        } else {
            res.json({ success: false });
        }
    } catch (error) {
        res.json({ success: false });
    }
}

//Function that help to insert updated cart data (updated in cart page) in OColl & Move to payment page:;
export const updtCrtAndProsedToPy = async (req, res) => {
    try {
        let orderId = fun.getEncrptdDta(req.body.id);
        let orderKey = fun.getEncrptdDta(req.body.key);
        await OColl.updateOne({ orderId: orderId.data, orderKey: orderKey.data }, { $set: { data: req.body.data, Total: req.body.Total } });
        res.json({ success: true, Oi: req.body.id, OrdK: req.body.key });
    } catch (error) {
        res.json({ success: false });
    }
}

// Function that help to cancel the order after clicking on cancel btn in delivery form page:
export const cancalTheOrder = async (req, res) => {
    let orderId = fun.getEncrptdDta(req.body.orderId);
    await OColl.deleteMany({ orderId: orderId.data });
    res.json({ success: true });
}

// Function that help to insert Address information to the order data in OColl If payment method is not "Bank Tranfer";
export const AddUserAddress = async (req, res) => {
    let orderId = fun.getEncrptdDta(req.body.orderId);
    let orderKey = fun.getEncrptdDta(req.body.ordrKey);
    await OColl.updateOne({ orderId: orderId.data, orderKey: orderKey.data }, { $set: { userAdd: req.body.Address, Date: Date.now() } });
    res.json({ success: true });
}

// Function that help to insert Address information to the order data in OColl If payment method is "Bank Tranfer";
export const AddUserAddressBt = async (req, res) => {
    let orderId = fun.getEncrptdDta(req.body.orderId);
    let orderKey = fun.getEncrptdDta(req.body.ordrKey);
    await OColl.updateOne({ orderId: orderId.data, orderKey: orderKey.data }, { $set: { userAdd: req.body.Address, scriptImg: req.file.filename } });
    res.json({ success: true });
}