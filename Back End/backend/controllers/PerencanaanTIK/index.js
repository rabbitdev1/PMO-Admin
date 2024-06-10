import PerencanaanTIKModel from "../../models/PerencanaanTIKModel.js";
import SekretariatModel from "../../models/SekretariatModel.js";

export const setStatusDataPerencanaanTIK = async(req, res) => {
    try {
        let rawData = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        let processedData = {...rawData };
        const notAllowedFields = ["role", "apiKey"];
        notAllowedFields.forEach((field) => {
            if (processedData.hasOwnProperty(field)) {
                delete processedData[field];
            }
        });

        console.log("Processed data:", processedData);
        console.log(1, rawData);

        if (Array.isArray(rawData.role) || typeof rawData.role === "object") {
            rawData.role = JSON.stringify(rawData.role);
        }
        rawData.apiKey = apiKey;
        rawData.fields = JSON.stringify(processedData);
        rawData.submission_status = 1;
        rawData.on_process = JSON.stringify({});
        rawData.on_validation = JSON.stringify({ status_validation: "1" });
        rawData.on_validation_technique = JSON.stringify({});
        rawData.on_finish = JSON.stringify({ submission_status: "0" });

        await PerencanaanTIKModel.create(rawData);
        res.status(200).json({
            status: "ok",
            msg: "Item created successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const editProcessDataPerencanaanTIK = async(req, res) => {
    try {
        const { id, status } = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        const PerencanaanTIKItem = await PerencanaanTIKModel.findOne({
            where: {
                id: id,
            },
        });
        if (!PerencanaanTIKItem) {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }
        if (parseInt(PerencanaanTIKItem.submission_status) === 1) {
            console.log("jalan");
            PerencanaanTIKItem.submission_status = 2;
            await PerencanaanTIKItem.save();
        } else if (parseInt(PerencanaanTIKItem.submission_status) === 4) {
            console.log("jalan");
            if (status === "Ditolak") {
                PerencanaanTIKItem.submission_status = 5;
            } else if (status === "Lanjutkan") {
                PerencanaanTIKItem.submission_status = 6;
            } else {
                PerencanaanTIKItem.submission_status = 4;
            }
            await PerencanaanTIKItem.save();
        }
        return res.status(200).json({
            status: "ok",
            msg: "Item updated successfully",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};