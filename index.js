import express from "express";
import cors from "cors";
import dotenv from "dotenv"; //secure 1
import "./config/connection.js";
import morgan from "morgan";
import categoryRouter from "./src/modules/category/category.route.js";


const port =  process.env.PORT || 8000
const mode = process.env.NODE_ENV 

dotenv.config();
const app = express();

//middleware
app.use(cors());
app.use(express.json());
if(process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
    console.log(`mode: ${mode}`);
}




//router
app.use(categoryRouter);
app.get("/", (req, res) => res.send(" World!"));

// app.all("*", (req, res, next) => {
//   next(new AppError(`This Resource Is Not Available ${req.originalUrl}`, 404));
// });

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app running on port ${port} mode: ${mode}! ^_^ `);
});
