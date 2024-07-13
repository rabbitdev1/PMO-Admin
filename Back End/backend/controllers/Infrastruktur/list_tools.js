import ListToolsModel from "../../models/ListToolsInfra.js";

export const getListDataTools = async (req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        } else {
            const infrastruktur = await ListToolsModel.findAll();
            infrastruktur.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            const totalItemsByStatus = {
                totalAlatKosong: infrastruktur.filter((item) => item.total_tools === '0' || item.total_tools === 0).length,
            };

            res.json({
                status: "ok",
                msg: "Data Alat retrieved successfully",
                data: infrastruktur.map((item) => {
                    return {
                        id: item.id,
                        name_tools: item.name_tools,
                        type_tools: item.type_tools,
                        total_tools: item.total_tools,
                        spec_tools: item.spec_tools,
                        createdAt: item.createdAt,
                    };
                }),
                totalItems: infrastruktur.length,
                totalItemsByStatus: totalItemsByStatus,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const getListDataToolsbyArray = async (req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        } else {
            const infrastruktur = await ListToolsModel.findAll();
            infrastruktur.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            const totalItemsByStatus = {
                totalAlatKosong: infrastruktur.filter((item) => item.total_tools === '0' || item.total_tools === 0).length,
            };

            res.json({
                status: "ok",
                msg: "Data Alat retrieved successfully",
                data: infrastruktur.map((item) => {
                    return {
                        value: item.name_tools + ' - (' + item.spec_tools + ')',
                        label: item.name_tools + ' - (' + item.spec_tools + ')',
                    };
                }),
                totalItems: infrastruktur.length,
                totalItemsByStatus: totalItemsByStatus,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};
export const setListDataTools = async (req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        const { unit_price, total_price, spec_tools, total_tools, name_tools, type_tools } = req.body;
        if (!unit_price || !total_price || !spec_tools || !total_tools || !name_tools || !type_tools) {
            return res.status(400).json({
                status: "error",
                msg: "All fields are required",
            });
        }
        ListToolsModel.create({
            unit_price,
            type_tools,
            total_price,
            spec_tools,
            total_tools,
            name_tools,
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
