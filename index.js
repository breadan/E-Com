import categoryRouter from "./src/routes/category.route.js";
import "./config/connection.js";
import 'dotenv/config'
import morgan from 'morgan';
import "./config/connection.js";
import express from "express";
import cors from "cors";
import dotenv from 'dotenv';


const port =  process.env.PORT || 8000
const mode = process.env.NODE_ENV 

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(categoryRouter);

if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode: ${mode}`);
}




app.get("/", (req, res) => res.send(" World!"));





app.listen(port, () => {
  console.log(`Example app running on port ${port} mode: ${mode}! ^_^ `);
});
