import SistemVirtualModel from "../../models/LayananSistemVirtualModel.js";

export const setStatusDataSistemVirtual = async(req, res) => {
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

        await SistemVirtualModel.create(rawData);
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

export const editProcessDataSistemVirtual = async(req, res) => {
    try {
        const { id, status } = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        const SistemVirtualItem = await SistemVirtualModel.findOne({
            where: {
                id: id,
            },
        });
        if (!SistemVirtualItem) {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }
        if (parseInt(SistemVirtualItem.submission_status) === 1) {
            console.log("jalan");
            SistemVirtualItem.submission_status = 2;
            await SistemVirtualItem.save();
        } else if (parseInt(SistemVirtualItem.submission_status) === 4) {
            console.log("jalan");
            if (status === "Ditolak") {
                SistemVirtualItem.submission_status = 5;
            } else if (status === "Lanjutkan") {
                SistemVirtualItem.submission_status = 6;
            } else {
                SistemVirtualItem.submission_status = 4;
            }
            await SistemVirtualItem.save();
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