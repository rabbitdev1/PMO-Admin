import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import db from "./config/Database.js";
import storage from "./config/Firebase.js";
import Aplikasi from "./models/Aplikasi.js";
import InfraModel from "./models/InfraModel.js";
import Sekretariat from "./models/SekretariatModel.js";
import Users from "./models/UserModel.js";
import router from "./routes/index.js";

import SistemVirtual from "./models/LayananSistemVirtualModel.js";

import LayananData from "./models/LayananDataModel.js";
import { default as ListAppsModel, default as ListToolsModel } from "./models/ListToolsInfra.js";
import PerencanaanTIKModel from "./models/PerencanaanTIKModel.js";
import PermohonanSI from "./models/PermohonanSI.js";
import ListReview from "./models/ReviewModel.js";
import TeknologiSI from "./models/TeknologiSIModel.js";


dotenv.config();

const app = express();

app.get('/', (req, res) => {
    res.send('JANGAN GANGGU');
});

app.use((req, res, next) => {
    const clientTimezone = req.get("Client-Timezone");
    if (clientTimezone) {
        req.clientTimezone = clientTimezone;
    }
    next();
});
app.use(morgan('dev'));

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const startServer = async () => {
    try {
        await db.authenticate();
        console.log("Database Connected...");
        console.log("Firestorage initialized " + JSON.stringify(storage));

        await Aplikasi.sync();
        await InfraModel.sync();
        await Sekretariat.sync();

        await PerencanaanTIKModel.sync();
        await LayananData.sync();

        await TeknologiSI.sync();

        await SistemVirtual.sync();
        await PermohonanSI.sync();

        await ListToolsModel.sync();
        await ListAppsModel.sync();
        await ListReview.sync();

        await Users.sync({alter: true});


    } catch (error) {
        console.error("Unable to connect to the database:", error);
        process.exit(1); // Exit process with failure
    }


    // const PORT = process.env.DEV_PORT;
    // const HOSTNAME = process.env.DEV_HOSTNAME;

    const PORT = process.env.DEV_PORT;
    const HOSTNAME = process.env.DEV_HOSTNAME;


    // app.listen(PORT, HOSTNAME, () => console.log(`Server running at http://${HOSTNAME}:${PORT} `));
    app.listen(PORT, HOSTNAME, () => console.log(`Server running at http://${HOSTNAME}:${PORT} `));
};

startServer();