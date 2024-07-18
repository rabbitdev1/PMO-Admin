import LayananDataModel from "../../models/LayananDataModel.js";
import ListReviewsModel from "../../models/ReviewModel.js";

export const getDetailDataLayananData = async (req, res) => {
    try {
        const { id, role } = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }

        const LayananDataDetail = await LayananDataModel.findByPk(id);
        if (!LayananDataDetail) {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }

        const userHasPermission =
            LayananDataDetail.dataValues.role.includes(role);
        if (!userHasPermission) {
            return res.status(403).json({
                status: "error",
                msg: "You don't have permission to view this detail",
            });
        }

        const fields = JSON.parse(LayananDataDetail.fields);
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
            return { ...rearrangedObj, ...obj };
        };

        // Add createdAt to fields before rearranging
        fields.createdAt = LayananDataDetail.createdAt;
        const rearrangedData = rearrangeObject(fields, propertiesToMoveUp);

        const reviews = await ListReviewsModel.findAll({
            attributes: ['rating', 'comment'],
            where: {
                id_submission: id,
                submission_title: rearrangedData.submission_title,
            },
        });

        // Prepare review data from the query result
        let reviewData = null;
        if (reviews.length > 0) {
            reviewData = {
                rating: reviews[0].rating,
                comment: reviews[0].comment,
            };
        }
        res.json({
            status: "ok",
            msg: "Data retrieved successfully",
            data: {
                id: LayananDataDetail.id,
                submission_status: LayananDataDetail.submission_status,
                comment: LayananDataDetail.comment,
                fileuploaded: LayananDataDetail.fileuploaded,
                fields: rearrangedData,
                on_validation: LayananDataDetail.on_validation,
                on_validation_technique: LayananDataDetail.on_validation_technique,
                on_process: LayananDataDetail.on_process,
                on_finish: LayananDataDetail.on_finish,
                review: reviewData,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};