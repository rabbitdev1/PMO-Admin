import ListReviewsModel from "../../models/ReviewModel.js";

export const setListDataReviews = async (req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        const { id_submission, submission_title, submission_type, rating, comment, name_pic } = req.body;
        if (!submission_title || !submission_type || !rating || !comment || !id_submission || !name_pic || !apiKey) {
            return res.status(400).json({
                status: "error",
                msg: "All fields are required",
            });
        }
        ListReviewsModel.create({
            submission_title, submission_type, rating, comment, id_submission, name_pic
        });
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
