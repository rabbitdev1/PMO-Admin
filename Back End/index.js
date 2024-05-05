import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import db from "./config/Database.js";
import { HelpDeskFaq, ListHelpdesk } from "./models/HelpdeskModel.js";
import Users from "./models/UserModel.js";
import router from "./routes/index.js";
dotenv.config();
const app = express();

try {
  await db.authenticate();
  console.log("Database Connected...");
} catch (error) {
  console.error(error);
}

app.use((req, res, next) => {
  const clientTimezone = req.get('Client-Timezone');
  if (clientTimezone) {
    req.clientTimezone = clientTimezone;
  }
  next();
});

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
// app.use("/dokumen", express.static("public/berkas"));

Users.sync();
HelpDeskFaq.sync();
ListHelpdesk.sync();
app.listen(3001, () => console.log("Server running at port 5000"));
