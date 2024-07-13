import SekretariatModel from "../../models/SekretariatModel.js";

export const getListDataSekretariat = async(req, res) => {
    try {
        const { role } = req.body;
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        } else {
            const sekretariat = await SekretariatModel.findAll();
            sekretariat.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            const filteredsekretariat = sekretariat.filter((item) => {
                if (!item.role) return false;
                const itemRoles = JSON.parse(item.role);
                return itemRoles.includes(role);
            });

            if (role === "perangkat_daerah") {
                const validsekretariat = filteredsekretariat.filter(
                    (item) => item.apiKey === apiKey
                );

                if (validsekretariat.length === 0) {
                    return res.status(200).json({
                        status: "error",
                        msg: "Item not found",
                    });
                }

                const totalItemsByStatus = {
                    divalidasi: filteredsekretariat.filter(
                        (user) => user.submission_status === 2 || user.submission_status === 4
                    ).length,
                    diproses: filteredsekretariat.filter(
                        (user) => user.submission_status === 6
                    ).length,
                    ditolak: filteredsekretariat.filter(
                        (user) => user.submission_status === 3 || user.submission_status === 5 || user.submission_status === 8
                    ).length,
                    disetujui: filteredsekretariat.filter(
                        (user) => user.submission_status === 7
                    ).length,
                };
                res.json({
                    status: "ok",
                    msg: "Data sekretariat retrieved successfully",
                    data: validsekretariat.map((item) => {
                        const fields = JSON.parse(item.fields);
                        return {
                            id: item.id,
                            name_pic: fields.name_pic,
                            submission_title: item.submission_title,
                            submission_status: item.submission_status,
                            createdAt: item.createdAt,
                        };
                    }),
                    totalItems: validsekretariat.length,
                    totalItemsByStatus: totalItemsByStatus,
                });
            } else {
                // Jika bukan peran perangkat_daerah, kembalikan data tanpa validasi API key
                const totalItemsByStatus = {
                    divalidasi: filteredsekretariat.filter(
                        (user) => user.submission_status === 2 || user.submission_status === 4
                    ).length,
                    diproses: filteredsekretariat.filter(
                        (user) => user.submission_status === 6
                    ).length,
                    ditolak: filteredsekretariat.filter(
                        (user) => user.submission_status === 3 || user.submission_status === 5 || user.submission_status === 8
                    ).length,
                    disetujui: filteredsekretariat.filter(
                        (user) => user.submission_status === 7
                    ).length,
                };
                res.json({
                    status: "ok",
                    msg: "Data sekretariat retrieved successfully",
                    data: filteredsekretariat.map((item) => {
                        const fields = JSON.parse(item.fields);
                        return {
                            id: item.id,
                            name_pic: fields.name_pic,
                            submission_title: item.submission_title,
                            submission_status: item.submission_status,
                            createdAt: item.createdAt,
                        };
                    }),
                    totalItems: filteredsekretariat.length,
                    totalItemsByStatus: totalItemsByStatus,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};