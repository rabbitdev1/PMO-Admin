import { deleteFiles } from "../../components/UploadFile.js";
import { deleteImage } from "../../components/UploadImage.js";
import SistemVirtualModel from "../../models/LayananSistemVirtualModel.js";

export const deleteDataSistemVirtual = async (req, res) => {
    try {
        const { id, layanan } = req.body;
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

        const mergedDataProcess = {
            ...JSON.parse(SistemVirtualItem.on_validation),
            ...JSON.parse(SistemVirtualItem.on_process),
            ...JSON.parse(aplikasiItem.on_validation_technique),
            ...JSON.parse(SistemVirtualItem.on_finish),
            ...JSON.parse(SistemVirtualItem.fields),
        };
        console.log("Merged Data:", mergedDataProcess);

        const findValueByTitle = (data, title) => data[title];

        const file_pengajuan_zoomValue = findValueByTitle(mergedDataProcess, 'file_pengajuan_zoom');
        const upload_dokumen_liputanValue = findValueByTitle(mergedDataProcess, 'upload_dokumen_liputan');
        const upload_dokumen_zoomValue = findValueByTitle(mergedDataProcess, 'upload_dokumen_zoom');
        const file_pengajuan_podcastValue = findValueByTitle(mergedDataProcess, 'file_pengajuan_podcast');
        const file_submissionValue = findValueByTitle(mergedDataProcess, 'file_submission');
        const file_uploadValue = findValueByTitle(mergedDataProcess, 'file_upload');

        const foundValues = [
            file_pengajuan_zoomValue,
            file_submissionValue,
            upload_dokumen_liputanValue,
            upload_dokumen_zoomValue,
            file_pengajuan_podcastValue,
            file_uploadValue
        ].filter(Boolean);

        if (foundValues.length > 0) {
            await Promise.all(foundValues.map(async value => {
                await deleteFiles(value, layanan);
                await deleteImage(value, layanan);
            }));
            console.log("Data ditemukan dan dihapus:", foundValues, layanan);
        } else {
            console.log("Data tidak ditemukan");
        }

        const deletedItem = await SistemVirtualModel.destroy({
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
        console.error("Error deleting Teknologi SI data:", error);
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};
