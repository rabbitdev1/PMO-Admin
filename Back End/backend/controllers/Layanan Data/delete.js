import { deleteFiles } from "../../components/UploadFile.js";
import { deleteImage } from "../../components/UploadImage.js";
import LayananDataModel from "../../models/LayananDataModel.js";

export const deleteDataLayananData = async (req, res) => {
    try {
        const { id, layanan } = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }

        const LayananDataItem = await LayananDataModel.findOne({
            where: {
                id: id,
            },
        });

        if (!LayananDataItem) {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }

        const mergedDataProcess = {
            ...JSON.parse(LayananDataItem.on_validation),
            ...JSON.parse(LayananDataItem.on_process),
            ...JSON.parse(LayananDataItem.on_validation_technique),
            ...JSON.parse(LayananDataItem.on_finish),
            ...JSON.parse(LayananDataItem.fields),
        };
        console.log("Merged Data:", mergedDataProcess);

        const findValueByTitle = (data, title) => data[title];

        const file_dataValue = findValueByTitle(mergedDataProcess, 'file_data');
        const surat_permohonanaValue = findValueByTitle(mergedDataProcess, 'surat_permohonan');
        const upload_dokumen_hasil_analisaValue = findValueByTitle(mergedDataProcess, 'upload_dokumen_hasil_analisa');
        const upload_file_data_validValue = findValueByTitle(mergedDataProcess, 'upload_file_data_valid');
        const file_submissionValue = findValueByTitle(mergedDataProcess, 'file_submission');

        const foundValue = [
            file_dataValue,
            surat_permohonanaValue,
            upload_dokumen_hasil_analisaValue,
            file_submissionValue,
            upload_file_data_validValue
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

        const deletedItem = await LayananDataModel.destroy({
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
        console.error("Error deleting Layanan Data:", error);
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};
