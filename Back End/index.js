import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import db from "./config/Database.js";
import router from "./routes/index.js";
import Users from "./models/UserModel.js";
import { HelpDeskFaq, ListHelpdesk } from "./models/HelpdeskModel.js";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
} catch (error) {
  console.error(error);
}

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
// app.use("/dokumen", express.static("public/berkas"));

// Users.sync();
HelpDeskFaq.sync();
ListHelpdesk.sync();
app.listen(3001, () => console.log("Server running at port 5000"));
