import { deleteFiles } from "../../components/UploadFile.js";
import { deleteImage } from "../../components/UploadImage.js";
import PermohonanSI from "../../models/PermohonanSI.js";

export const deleteDataPermohonanSI = async (req, res) => {
    try {
        const { id, layanan } = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }

        const permohonanSIItem = await PermohonanSI.findOne({
            where: {
                id: id,
            },
        });

        if (!permohonanSIItem) {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }

        const mergedDataProcess = {
            ...JSON.parse(permohonanSIItem.on_validation),
            ...JSON.parse(permohonanSIItem.feasibility_analysis),
            ...JSON.parse(permohonanSIItem.feasibility_validation),
            ...JSON.parse(permohonanSIItem.technical_analysis),
            ...JSON.parse(permohonanSIItem.technical_validation),
            ...JSON.parse(permohonanSIItem.recommendation_letter_technical),
            ...JSON.parse(permohonanSIItem.fields),
        };

        console.log("Merged Data:", mergedDataProcess);

        const findValueByTitle = (data, title) => data[title];

        const skpd_request_letterValue = findValueByTitle(mergedDataProcess, 'skpd_request_letter');
        const technicalRecommendationLetterValue = findValueByTitle(mergedDataProcess, 'technicalRecommendationLetter');
        const anggaranAttachmentValue = findValueByTitle(mergedDataProcess, 'anggaranAttachment');
        const file_submissionValue = findValueByTitle(mergedDataProcess, 'file_submission');
        const file_uploadValue = findValueByTitle(mergedDataProcess, 'file_upload');
        const recommendation_letter_technicalValue = findValueByTitle(mergedDataProcess, 'recommendation_letter_technical');

        const foundValues = [
            skpd_request_letterValue,
            technicalRecommendationLetterValue,
            anggaranAttachmentValue,
            file_submissionValue,
            file_uploadValue,
            recommendation_letter_technicalValue
        ].filter(Boolean);

        if (foundValues.length > 0) {
            await Promise.all(foundValues.map(async value => {
                await deleteFiles(value, layanan);
                await deleteImage(value, layanan);
            }));
            console.log("Data ditemukan:", foundValues, layanan);
        }

        const deletedItem = await PermohonanSI.destroy({
            where: {
                id: id,
            },
        });

        if (deletedItem) {
            return res.status(200).json({
                status: "ok",
                msg: "Item deleted successfully",
            });
        } else {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};
