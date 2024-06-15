import { deleteFiles } from "../../components/UploadFile.js";
import { deleteImage } from "../../components/UploadImage.js";
import SekretariatModel from "../../models/SekretariatModel.js";

export const deleteDataSekretariat = async (req, res) => {
    try {
        const { id, layanan } = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }

        const sekretariatItem = await SekretariatModel.findOne({
            where: {
                id: id,
            },
        });

        if (!sekretariatItem) {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }

        const mergedDataProcess = {
            ...JSON.parse(sekretariatItem.on_validation),
            ...JSON.parse(sekretariatItem.on_process),
            ...JSON.parse(sekretariatItem.on_finish),
            ...JSON.parse(sekretariatItem.fields),
        };
        console.log("Merged Data:", mergedDataProcess);

        const findValueByTitle = (data, title) => data[title];

        const upload_dokumen_hasil_integrasiValue = findValueByTitle(mergedDataProcess, 'upload_dokumen_hasil_integrasi');
        const file_submissionValue = findValueByTitle(mergedDataProcess, 'file_submission');
        const file_uploadValue = findValueByTitle(mergedDataProcess, 'file_upload');

        const foundValue = [
            upload_dokumen_hasil_integrasiValue,
            file_submissionValue,
            file_uploadValue
        ].filter(Boolean);

        if (foundValue) {
            await Promise.all(foundValue.map(async value => {
                await deleteFiles(value, layanan);
                await deleteImage(value, layanan);
            }));
            console.log("Data ditemukan dan dihapus:", foundValue, layanan);
        } else {
            console.log("Data tidak ditemukan");
        }

        const deletedItem = await SekretariatModel.destroy({
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
        console.error("Error deleting Sekretariat data:", error);
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};
