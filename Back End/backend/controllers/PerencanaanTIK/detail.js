import PerencanaanTIKModel from "../../models/PerencanaanTIKModel.js";
import SekretariatModel from "../../models/SekretariatModel.js";

export const getDetailDataPerencanaanTIK = async(req, res) => {
    try {
        const { id, role } = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }

        const perencanaanTIKDetail = await PerencanaanTIKModel.findByPk(id);
        if (!perencanaanTIKDetail) {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }

        const userHasPermission =
        perencanaanTIKDetail.dataValues.role.includes(role);
        if (!userHasPermission) {
            return res.status(403).json({
                status: "error",
                msg: "You don't have permission to view this detail",
            });
        }

        const fields = JSON.parse(perencanaanTIKDetail.fields);
        // Move specific properties to the top of the object
        const propertiesToMoveUp = [
            "createdAt",
            "submission_title",
            "submission_type",
        ];
        const rearrangeObject = (obj, props) => {
            const rearrangedObj = {};
            props.forEach((prop) => {
                if (obj[prop] !== undefined) {
                    rearrangedObj[prop] = obj[prop];
                    delete obj[prop];
                }
            });
            return {...rearrangedObj, ...obj };
        };

        // Add createdAt to fields before rearranging
        fields.createdAt = perencanaanTIKDetail.createdAt;
        const rearrangedData = rearrangeObject(fields, propertiesToMoveUp);
        res.json({
            status: "ok",
            msg: "Data retrieved successfully",
            data: {
                id: perencanaanTIKDetail.id,
                submission_status: perencanaanTIKDetail.submission_status,
                comment: perencanaanTIKDetail.comment,
                fileuploaded: perencanaanTIKDetail.fileuploaded,
                fields: rearrangedData,
                on_validation: perencanaanTIKDetail.on_validation,
                on_validation_technique: perencanaanTIKDetail.on_validation_technique,
                on_process: perencanaanTIKDetail.on_process,
                on_finish: perencanaanTIKDetail.on_finish,
            },
        });
    } catch (error) {
        console.error(error); // Log error for debugging purposes
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};