import express from "express";
import cors from "cors";
import Routes from "./Router/Router.js";
import path from "path";
const app = express();

const port = process.env.PORT;
app.use(cors());
app.use("/pr0ducts", express.static(path.resolve("Products")));
app.use("/$rpt", express.static(path.resolve("Scripts")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Routes);

app.listen(port, () => {
    console.log(`Alhumdulilah App is Listening at port ${port}`);
})