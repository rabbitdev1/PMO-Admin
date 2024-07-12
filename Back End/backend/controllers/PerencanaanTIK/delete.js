import { deleteFiles } from "../../components/UploadFile.js";
import { deleteImage } from "../../components/UploadImage.js";
import PerencanaanTIK from "../../models/PerencanaanTIKModel.js";

export const deleteDataPerencanaanTIK = async (req, res) => {
    try {
        const { id, layanan } = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }

        const perencanaantikItem = await PerencanaanTIK.findOne({
            where: {
                id: id,
            },
        });

        if (!perencanaantikItem) {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }

        const mergedDataProcess = {
            ...JSON.parse(perencanaantikItem.on_validation),
            ...JSON.parse(perencanaantikItem.on_validation_technique),
            ...JSON.parse(perencanaantikItem.on_process),
            ...JSON.parse(perencanaantikItem.on_finish),
            ...JSON.parse(perencanaantikItem.fields),
        };

        const findValueByTitle = (data, title) => data[title];

        const upload_dokumen_kebijakanValue = findValueByTitle(mergedDataProcess, 'upload_dokumen_kebijakan');
        const draft_perwalValue = findValueByTitle(mergedDataProcess, 'draft_perwal');
        const upload_dokumen_laporan_perkepValue = findValueByTitle(mergedDataProcess, 'upload_dokumen_laporan_perkep');
        const file_submissionValue = findValueByTitle(mergedDataProcess, 'file_submission');

        const foundValue = [
            upload_dokumen_kebijakanValue,
            draft_perwalValue,
            upload_dokumen_laporan_perkepValue,
            file_submissionValue,
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

        const deletedItem = await PerencanaanTIK.destroy({
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
        return res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};
