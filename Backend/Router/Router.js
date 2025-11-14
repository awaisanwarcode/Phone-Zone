import express from "express";
import * as fun from "../Controller/Controller.js";
import multer from "multer";
import path from "path";
const Routes = express.Router();

const storeImg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("Products"))
    },
    filename: (req, file, cb) => {
        let extName = path.extname(file.originalname);
        cb(null, `${Date.now()}${extName}`)
    }
});
const uploads = multer({ storage: storeImg });
Routes.post("/Ad/prdct/Add", uploads.single("image"), fun.AddProduct);
Routes.get("/Ad/prdct/All", fun.GetAllPrdct);
Routes.get("/Ad/ordrs/all", fun.GetAllOrdrs);
Routes.post("/del/prdct/Admn", fun.delItmByAdm);
Routes.post("/Ad/del/ordr", fun.delOrdrByAdm);

const storepaymentScript = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve("Scripts"))
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${path.extname(file.originalname)}`)
    }
});
const uploadScript = multer({ storage: storepaymentScript });
Routes.get("/get/all/itms", fun.GetAllPrdct);
Routes.post("/add/cartdata", fun.AddCartData);
Routes.post("/get/cartData", fun.getCartData);
Routes.post("/proceed/Payment", fun.updtCrtAndProsedToPy);
Routes.post("/cancel/ordr", fun.cancalTheOrder);
Routes.post("/Add/Address/Smpl", fun.AddUserAddress);
// Here Bt refers to Payment via Bank Transfer;
Routes.post("/Add/Address/Bt", uploadScript.single("image"), fun.AddUserAddressBt);



export default Routes;