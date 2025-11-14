import Jwt from "jsonwebtoken";

// Function that help to generate  orderId for new order;
export const idGen = async (coll) => {
    let AllItems = await coll.find({}).toArray();
    if (AllItems.length === 0) {
        let id = 1;
        return id;
    } else {
        let id = AllItems.length + 1;
        let [idExsist] = await coll.find({ orderId: id }).toArray();
        (idExsist) ? id = idExsist.orderId + 1 : id;
        return id;
    }
}

// Function that help to generate order key for new order
export const GenOrderKey = () => {
    let keyArr = ["1", "!", "2", "@", "a", "B", "3", "%", ",", "|", "Z", "100"];
    let ordr_Key = "";
    for (let i = 0; i < 5; i++) {
        let idx = Math.floor(Math.random() * 11);
        ordr_Key += keyArr[idx]
    }
    return ordr_Key;
}

// Function that help to encrypt the data like order key etc;
export const encryptdata = (data) => {
    let encryptedData = Jwt.sign({ data }, process.env.JWT_KEY);
    return encryptedData;
}

// Function that help to get simple data from encrypted formn of data; 
export const getEncrptdDta = (token) => {
    let data = Jwt.verify(token, process.env.JWT_KEY);
    return data;
}

// Function that help to allot new IDs to items ( in PColl ) after Deleting Item from PColl;
export const correctingSeries = async (PColl) => {
    let allItems = await PColl.find({}).toArray();
    for (let i = 0; i < allItems.length; i++) {
        await PColl.updateOne({ id: allItems[i].id }, { $set: { id: i + 1 } });
    }
}
