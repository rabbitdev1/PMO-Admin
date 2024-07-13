import InfraModel from "../../models/InfraModel.js";

export const setStatusDataInfrastruktur = async(req, res) => {
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

        await InfraModel.create(rawData);
        res.status(200).json({
            status: "ok",
            msg: "Item created successfully",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const editProcessDataInfrastruktur = async(req, res) => {
    try {
        const { id, status } = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        const infrastrukturItem = await InfraModel.findOne({
            where: {
                id: id,
            },
        });
        if (!infrastrukturItem) {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }
        if (parseInt(infrastrukturItem.submission_status) === 1) {
            infrastrukturItem.submission_status = 2;
            await infrastrukturItem.save();
        } else if (parseInt(infrastrukturItem.submission_status) === 4) {
            if (status === "Ditolak") {
                infrastrukturItem.submission_status = 5;
            } else if (status === "Lanjutkan") {
                infrastrukturItem.submission_status = 6;
            } else {
                infrastrukturItem.submission_status = 4;
            }
            await infrastrukturItem.save();
        }
        return res.status(200).json({
            status: "ok",
            msg: "Item updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};