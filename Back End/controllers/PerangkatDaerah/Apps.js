import ListAppsModel from "../../models/ListApps.js";

export const getListDataApps = async (req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        } else {
            const listApps = await ListAppsModel.findAll();
            listApps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Filter the list based on the apiKey
            const filteredApps = listApps.filter(app => app.apiKey === apiKey);

            res.json({
                status: "ok",
                msg: "Data Aplikasi retrieved successfully",
                data: filteredApps.map((item) => {
                    return {
                        id: item.id,
                        name_apps: item.name_apps,
                        createdAt: item.createdAt,
                    };
                }),
                totalItems: filteredApps.length,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};


export const getListDataAppsbyArray = async (req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        } else {
            const listApps = await ListAppsModel.findAll();
            listApps.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            const filteredApps = listApps.filter(app => app.apiKey === apiKey);
            res.json({
                status: "ok",
                msg: "Data Aplikasi retrieved successfully",
                data: filteredApps.map((item) => {
                    return {
                        value: item.name_apps,
                        label: item.name_apps,
                    };
                }),
                totalItems: filteredApps.length,
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const setListDataApps = async (req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        const { name_apps } = req.body;
        if (!name_apps || !apiKey) {
            return res.status(400).json({
                status: "error",
                msg: "All fields are required",
            });
        }
        ListAppsModel.create({
            name_apps,
            apiKey
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

export const deleteListDataApps = async (req, res) => {
    try {
        const { id } = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "ID is required",
            });
        }

        const item = await ListAppsModel.findOne({
            where: {
                id: id,
            },
        });

        if (!item) {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }

        await item.destroy();

        res.status(200).json({
            status: "ok",
            msg: "Item deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const editListDataApps = async (req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }

        const { id, name_apps } = req.body;
        if (!id || !name_apps || !apiKey) {
            return res.status(400).json({
                status: "error",
                msg: "All fields are required",
            });
        }

        const item = await ListAppsModel.findOne({
            where: {
                id: id,
            },
        });

        if (!item) {
            return res.status(404).json({
                status: "error",
                msg: "Item not found",
            });
        }

        await item.update({
            name_apps,
            apiKey
        });

        res.status(200).json({
            status: "ok",
            msg: "Item updated successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};
