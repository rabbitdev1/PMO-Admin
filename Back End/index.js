import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import db from "./config/Database.js";
import router from "./routes/index.js";
import storage from "./config/Firebase.js";

import InfraModel from "./models/InfraModel.js";
import Users from "./models/UserModel.js";

import morgan from "morgan";
import { PengajuanPermohonanSi } from "./models/PengajuanPermohonanSi.js";


dotenv.config();

const app = express();
app.use((req, res, next) => {
  const clientTimezone = req.get("Client-Timezone");
  if (clientTimezone) {
    req.clientTimezone = clientTimezone;
  }
  next();
});

app.use(morgan("dev"))

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

try {
  await db.authenticate();
  console.log("Database Connected...");
  console.log("Firestorage initialized " +JSON.stringify(storage));
} catch (error) {
  console.error(error);
}

// HelpDeskFaq.sync();
// ListHelpdesk.sync();


InfraModel.sync()
Users.sync();
app.listen(3001, () => 
  console.log("Server running at port 5000"));

// PengajuanPermohonanSi.sync();

// ku solihin
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`)
})

// app.listen(3001, () => 
//   console.log("Server running at port 5000"));
