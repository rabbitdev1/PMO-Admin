import bcrypt from "bcrypt";
import moment from "moment-timezone";
import { deleteImage } from "../../components/UploadImage.js";
import { generateApiKey, generateToken } from "../../middleware/VerifyToken.js";
import Users from "../../models/UserModel.js";

export const Login = async (req, res) => {
    try {
        const clientTimezone = req.headers["client-timezone"] || "Asia/Jakarta";
        const { email, password, keepLogin } = req.body;

        if (!email || !password) {
            return res.status(400).json({ status: "error", msg: "Email and password are required" });
        }
        if (!moment.tz.zone(clientTimezone)) {
            return res.status(400).json({ status: "error", msg: "Invalid timezone provided" });
        }

        const user = await Users.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ status: "error", msg: "Invalid email or password" });
        }

        if (!await user.comparePassword(password)) {
            return res.status(400).json({ status: "error", msg: "Invalid email or password" });
        }

        if (user.status_account === "Nonaktif") {
            return res.status(400).json({ status: "error", msg: "Akun Anda telah dinonaktifkan. Silakan hubungi admin untuk informasi lebih lanjut." });
        }

        user.activeSession = null;
        await user.save();

        const token = generateToken(user, keepLogin);

        user.activeSession = token;
        await user.save();

        res.status(200).json({
            status: "ok",
            msg: "Successful login.",
            token: token,
            apiKey: user.apiKey,
            // clientTimezone: `Data processed using timezone: ${clientTimezone}`,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const Logout = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    try {
        const user = await Users.findOne({ where: { activeSession: token } });
        if (user) {
            user.activeSession = null;
            await user.save();
        }

        res.status(200).json({ status: "ok", msg: "Successfully logged out." });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getUser = async (req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }

        const user = await Users.findOne({
            where: { apiKey: apiKey },
            attributes: ["fullname", "id", "nip", "email", "telp", "address", "role", "instansi", "image"],
        });

        if (!user) {
            return res.status(404).json({
                status: "error",
                msg: "No user found with the provided API key",
            });
        }

        res.json({
            status: "ok",
            msg: "Data retrieved successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const getListUser = async (req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        const listuser = await Users.findAll({
            attributes: [
                "id",
                "fullname",
                "email",
                "telp",
                "address",
                "role",
                "image",
                "nip",
                "status_account",
                "instansi",
                "createdAt",
                "updatedAt",

            ],
        });
        const totalItems = listuser.length;
        const totalItemsByStatus = {
            aktif: listuser.filter((user) => user.status_account === "Aktif").length,
            nonaktif: listuser.filter((user) => user.status_account === "Nonaktif").length,
        };
        res.json({
            status: "ok",
            msg: "Data retrieved successfully",
            data: listuser,
            totalItems: totalItems,
            totalItemsByStatus: totalItemsByStatus,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const getUserById = async (req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "User ID is required in the request body",
            });
        }
        const user = await Users.findByPk(id, {
            attributes: [
                "createdAt",
                "fullname",
                "email",
                "telp",
                "address",
                "nip",
                "instansi",
                "role",
                "image",
                "status_account",
            ],
        });
        if (!user) {
            return res.status(404).json({
                status: "error",
                msg: "User not found",
            });
        }
        res.json({
            status: "ok",
            msg: "User details retrieved successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const updateUserStatus = async (req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        const { id, status_account } = req.body;
        if (!id || !status_account) {
            return res.status(400).json({
                status: "error",
                msg: "User ID and status_account are required in the request body",
            });
        }
        const user = await Users.findByPk(id);
        if (!user) {
            return res.status(404).json({
                status: "error",
                msg: "User not found",
            });
        }
        // Update the status_account field
        user.status_account = status_account;
        await user.save();
        res.status(200).json({
            status: "ok",
            msg: "User status updated successfully",
            data: {
                id: user.id,
                status_account: user.status_account,
            },
        });
    } catch (error) {
        console.error("Error updating user status:", error);
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const createUsers = async (req, res) => {
    try {
        const { fullname, nip, email, address, role, instansi, image, telp, password } = req.body;
        const apiKey = req.headers["x-api-key"];

        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        const existingUser = await Users.findOne({
            where: {
                email: email,
            },
        });
        if (existingUser && existingUser.email) {
            return res.status(400).json({
                status: "error",
                msg: "A user with the same email already exists.",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = await Users.create({
            apiKey: generateApiKey(20),
            fullname,
            email,
            role,
            address,
            image,
            telp,
            nip,
            instansi,
            password: hashPassword,
            status_account: "Aktif",
        });
        res.json({
            status: "ok",
            msg: "Successfully created the user.",
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const deleteUsers = async (req, res) => {
    try {
        const { id } = req.body;
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }
        const usersDeskItem = await Users.findOne({
            where: {
                id: id,
            },
        });
        if (!usersDeskItem) {
            return res.status(404).json({
                status: "error",
                msg: "Users item not found",
            });
        }
        if (usersDeskItem.image) {
            const fileName = usersDeskItem.image;
            await deleteImage(fileName, "users");
        }
        const deletedItem = await Users.destroy({
            where: {
                id: id,
            },
        });
        if (deletedItem) {
            res.status(200).json({
                status: "ok",
                msg: "Users item deleted successfully",
            });
        } else {
            res.status(404).json({
                status: "error",
                msg: "Users item not found",
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};
export const checkRoleUser = async (req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }

        const listuser = await Users.findAll({
            attributes: ["role"],
        });

        const roleCounts = {};
        listuser.forEach(user => {
            if (roleCounts[user.role]) {
                roleCounts[user.role]++;
            } else {
                roleCounts[user.role] = 1;
            }
        });

        const rolesList = [
            { value: "perangkat_daerah", label: "Perangkat Daerah", isDisabled: false },
            { value: "kadis", label: "Kepala Dinas", isDisabled: false },
            { value: "sekretariat", label: "Kepala Bidang Sekretariat", isDisabled: false },
            { value: "kabid_infra", label: "Kepala Bidang Infrastruktur Teknologi, Informasi dan Komunikasi", isDisabled: false },
            { value: "kabid_desiminasi", label: "Kepala Bidang Desiminasi Informasi", isDisabled: false },
            { value: "kabid_perencanaan", label: "Kepala Bidang Perencanaan teknologi,Informasi,dan Komunikasi", isDisabled: false },
            { value: "kabid_aplikasi", label: "Kepala Bidang Aplikasi Informatika,Persandian dan Keamanan Informasi", isDisabled: false },
            { value: "kabid_data", label: "Kepala Bidang Data", isDisabled: false },
            { value: "katim_sekre", label: "Ketua Tim Pokja Sekretariat", isDisabled: false },
            { value: "katim_infra", label: "Ketua Tim Pokja Bidang Infrastruktur Teknologi, Informasi dan Komunikasi", isDisabled: false },
            { value: "katim_desiminasi", label: "Ketua TIm Pokja Desiminasi Informasi", isDisabled: false },
            { value: "katim_perencanaan", label: "Ketua TIm Pokja Perencanaan teknologi,Informasi dan Komunikasi", isDisabled: false },
            { value: "katim_aplikasi", label: "Ketua Tim Pokja Aplikasi Informatika,Persandian an Keamanan Informasi", isDisabled: false },
            { value: "katim_data", label: "Ketua Tim Pokja Data", isDisabled: false },
            { value: "teknis_sekre", label: "Anggota Tim Pokja Sekretariat", isDisabled: false },
            { value: "teknis_infra", label: "Anggota Tim Pokja Bidang Infrastruktur Teknologi, Informasi dan Komunikasi", isDisabled: false },
            { value: "teknis_desiminasi", label: "Anggota TIm Pokja Desiminasi Informasi", isDisabled: false },
            { value: "teknis_perencanaan", label: "Anggota TIm Pokja Perencanaan teknologi,Informasi dan Komunikasi", isDisabled: false },
            { value: "teknis_aplikasi", label: "Anggota Tim Pokja Aplikasi Informatika,Persandian an Keamanan Informasi", isDisabled: false },
            { value: "teknis_data", label: "Anggota Tim Pokja Data", isDisabled: false },
        ];

        const updatedRolesList = rolesList.map(role => ({
            ...role,
            isDisabled: roleCounts[role.value] >= (role.value.startsWith("katim_") ? 3 : role.value.startsWith("kabid_") ? 1 : role.value.startsWith("sekretariat") ? 1 : 1000000)
        }));
        

        res.json({
            status: "ok",
            msg: "Data retrieved successfully",
            data: updatedRolesList,
        });
    } catch (error) {
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};
