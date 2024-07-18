import InfraModel from "../../models/InfraModel.js";
import ListReviewsModel from "../../models/ReviewModel.js";

export const getDetailDataInfrastruktur = async(req, res) => {
    try {
        const { id, role } = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }

        const infrastrukturDetail = await InfraModel.findByPk(id);
        if (!infrastrukturDetail) {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }

        const userHasPermission =
            infrastrukturDetail.dataValues.role.includes(role);
        if (!userHasPermission) {
            return res.status(403).json({
                status: "error",
                msg: "You don't have permission to view this detail",
            });
        }

        const fields = JSON.parse(infrastrukturDetail.fields);
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
        fields.createdAt = infrastrukturDetail.createdAt;
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
                id: infrastrukturDetail.id,
                submission_status: infrastrukturDetail.submission_status,
                comment: infrastrukturDetail.comment,
                fileuploaded: infrastrukturDetail.fileuploaded,
                fields: rearrangedData,
                on_validation: infrastrukturDetail.on_validation,
                on_validation_technique: infrastrukturDetail.on_validation_technique,
                on_process: infrastrukturDetail.on_process,
                on_finish: infrastrukturDetail.on_finish,
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