import bcrypt from "bcrypt";
import moment from "moment-timezone";
import { deleteImage } from "../components/UploadImage.js";
import { generateApiKey, generateToken } from "../middleware/VerifyToken.js";
import Users from "../models/UserModel.js";

// export const getUserById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await Users.findAll({
//       where: {
//         id: id,
//       },
//     });
//     res.json(user);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updateUsers = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { nama, email, alamat, nomor, password } = req.body;
//     const salt = await bcrypt.genSalt();
//     const hashPassword = await bcrypt.hash(password, salt);
//     const users = await Users.update(
//       {
//         nama,
//         email,
//         alamat,
//         nomor,
//         password: hashPassword,
//       },
//       {
//         where: {
//           id: id,
//         },
//       }
//     );
//     res.json(users);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const deleteUsers = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const users = await Users.destroy({
//       where: {
//         id: id,
//       },
//     });
//     res.json(users);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const Register = async (req, res) => {
//   const { nomor } = req.body;
//   const otp = Math.floor(100000 + Math.random() * 900000);
//   const waktu = Math.floor(Date.now() / 1000);
//   try {
//     await Users.destroy({
//       where: {
//         nomor: nomor,
//       },
//     });

//     await Users.create({
//       nomor: nomor,
//       otp: otp,
//       waktu: waktu,
//     });

//     const data = {
//       target: nomor,
//       message: `Your OTP: ${otp}`,
//     };

//     const result = await axios.post("https://api.fonnte.com/send", data, {
//       headers: {
//         Authorization: "xaL@fa!LhsLkwxXtn!Zv",
//       },
//     });
//     res.json({ msg: "Register Berhasil" });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const Verify = async (req, res) => {
//   const { nomor, otp } = req.body;
//   try {
//     const user = await Users.findOne({
//       where: {
//         nomor: nomor,
//         otp: otp,
//       },
//     });
//     if (user) {
//       const waktuOtp = user.waktu;
//       const currentTime = Math.floor(Date.now() / 1000);
//       const otpExpired = currentTime - waktuOtp > 300;

//       if (!otpExpired) {
//         await Users.update(
//           { aktif: "ya" },
//           {
//             where: {
//               nomor: nomor,
//             },
//           }
//         );
//         res.json({ message: "OTP is correct" });
//       } else {
//         res.status(400).json({ error: "OTP expired" });
//       }
//     } else {
//       res.status(400).json({ error: "Invalid OTP" });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const Login = async(req, res) => {
    try {
        const clientTimezone = req.headers["client-timezone"] || "Asia/Jakarta";
        const { email, password, keepLogin } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ status: "error", msg: "Email and password are required" });
        }

        if (!moment.tz.zone(clientTimezone)) {
            return res
                .status(400)
                .json({ status: "error", msg: "Invalid timezone provided" });
        }
        const user = await Users.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).json({ status: "error", msg: "User not found" });
        }
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(400).json({ status: "error", msg: "Invalid password" });
        }

        const token = generateToken(user, keepLogin);
        const apiKey = user.apiKey;
        res.status(200).json({
            status: "ok",
            msg: "Successful login.",
            token: token,
            apiKey: apiKey,
            // clientTimezone: `Data processed using timezone: ${clientTimezone}`,
        });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const getUser = async(req, res) => {
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
            attributes: ["fullname", "email", "address", "telp", "role", "image"],
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
        console.error(error);
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const getListUser = async(req, res) => {
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
                "address",
                "telp",
                "status",
                "role",
                "image",
                "createdAt",
                "updatedAt",
            ],
        });
        const totalItems = listuser.length;
        const totalItemsByStatus = {
            aktif: listuser.filter((user) => user.status === "Aktif").length,
            nonaktif: listuser.filter((user) => user.status === "Non Aktif").length,
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

export const getUserById = async(req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }

        const { id } = req.body; // Assuming the user ID is passed in the request body

        if (!id) {
            return res.status(400).json({
                status: "error",
                msg: "User ID is required in the request body",
            });
        }

        const user = await Users.findByPk(id, {
            attributes: [
                "fullname",
                "email",
                "address",
                "telp",
                "status",
                "role",
                "image",
                "createdAt",
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


export const createUsers = async(req, res) => {
    try {
        const { fullname, email, address, role, image, telp, password } = req.body;
        const apiKey = req.headers["x-api-key"];

        console.log(req.body);
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
            password: hashPassword,
            status: "Aktif",
        });
        res.json({
            status: "ok",
            msg: "Successfully created the user.",
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const deleteUsers = async(req, res) => {
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
        console.error(error);
        res.status(500).json({
            status: "error",
            msg: "Internal Server Error",
        });
    }
};

export const checkRoleUser = async(req, res) => {
    try {
        const apiKey = req.headers["x-api-key"];
        if (!apiKey) {
            return res.status(401).json({
                status: "error",
                msg: "API Key is required",
            });
        }

        // Retrieve the list of users from the database
        const listuser = await Users.findAll({
            attributes: ["role"],
        });

        // Extract the roles from the database result
        const existingRoles = listuser.map((user) => user.role);

        // Define the full list of roles with default status
        const rolesList = [{
                value: "perangkat_daerah",
                label: "Perangkat Daerah",
                isDisabled: false,
            },
            { value: "kadis", label: "Kepala Dinas", isDisabled: false },
            {
                value: "sekretariat",
                label: "Kepala Bidang Sekretariat",
                isDisabled: false,
            },
            {
                value: "kabid_infra",
                label: "Kepala Bidang Infrastruktur Teknologi, Informasi dan Komunikasi",
                isDisabled: false,
            },
            {
                value: "kabid_desiminasi",
                label: "Kepala Bidang Desiminasi Informasi",
                isDisabled: false,
            },
            {
                value: "kabid_perencanaan",
                label: "Kepala Bidang Perencanaan teknologi,Informasi,dan Komunikasi",
                isDisabled: false,
            },
            {
                value: "kabid_upt_radio",
                label: "Kepala Bidang UPT RADIO SONATA",
                isDisabled: false,
            },
            {
                value: "kabid_aplikasi",
                label: "Kepala Bidang Aplikasi Informatika,Persandian dan Keamanan Informasi",
                isDisabled: false,
            },
            {
                value: "katim_sek",
                label: "Ketua Tim Pokja Sekretariat",
                isDisabled: false,
            },
            {
                value: "katim_infra",
                label: "Ketua Tim Pokja Bidang Infrastruktur Teknologi, Informasi dan Komunikasi",
                isDisabled: false,
            },
            {
                value: "katim_desiminasi",
                label: "Ketua TIm Pokja Desiminasi Informasi",
                isDisabled: false,
            },
            {
                value: "katim_perencanaan",
                label: "Ketua TIm Pokja Perencanaan teknologi,Informasi dan Komunikasi",
                isDisabled: false,
            },
            {
                value: "katim_upt_radio",
                label: "Ketua Tim Pokja UPD RADIO SONATA",
                isDisabled: false,
            },
            {
                value: "katim_aplikasi",
                label: "Ketua Tim Pokja Aplikasi Informatika,Persandian an Keamanan Informasi",
                isDisabled: false,
            },
            {
                value: "teknis_sek",
                label: "Anggota Tim Pokja Sekretariat",
                isDisabled: false,
            },
            {
                value: "teknis_infra",
                label: "Anggota Tim Pokja Bidang Infrastruktur Teknologi, Informasi dan Komunikasi",
                isDisabled: false,
            },
            {
                value: "teknis_desiminasi",
                label: "Anggota TIm Pokja Desiminasi Informasi",
                isDisabled: false,
            },
            {
                value: "teknis_perencanaan",
                label: "Anggota TIm Pokja Perencanaan teknologi,Informasi dan Komunikasi",
                isDisabled: false,
            },
            {
                value: "teknis_upt_radio",
                label: "Anggota Tim Pokja UPD RADIO SONATA",
                isDisabled: false,
            },
            {
                value: "teknis_aplikasi",
                label: "Anggota Tim Pokja Aplikasi Informatika,Persandian an Keamanan Informasi",
                isDisabled: false,
            },
        ];

        // Update the status to true for roles that exist in the database
        const updatedRolesList = rolesList.map((role) => {
            if (existingRoles.includes(role.value)) {
                if (role.value === "perangkat_daerah") {
                    return {...role, isDisabled: false };
                } else {
                    return {...role, isDisabled: true };
                }
            }
            return role;
        });

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

// export const Logout = async (req, res) => {
//   const refreshToken = req.cookies.refreshToken;
//   if (!refreshToken) return res.sendStatus(204);
//   const user = await Users.findAll({
//     where: {
//       refresh_token: refreshToken,
//     },
//   });
//   if (!user[0]) return res.sendStatus(204);
//   const userId = user[0].id;
//   await Users.update(
//     { refresh_token: null },
//     {
//       where: {
//         id: userId,
//       },
//     }
//   );
//   res.clearCookie("refreshToken");
//   return res.sendStatus(200);
// };