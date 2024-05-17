import { deleteImage } from "../components/UploadImage.js";
import InfraModel from "../models/InfraModel.js";

export const getListInfrastruktur = async (req, res) => {
  try {
    const { role } = req.body;
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
      return res.status(401).json({
        status: "error",
        msg: "API Key is required",
      });
    } else {
      const helpdesk = await InfraModel.findAll();

      // Memeriksa apakah peran pengguna termasuk dalam peran yang diizinkan
      const filteredHelpdesk = helpdesk.filter((item) => {
        if (!item.role) return false; // Jika item tidak memiliki role, maka tidak dimasukkan ke dalam respons
        const itemRoles = JSON.parse(item.role);
        return itemRoles.includes(role);
      });

      if (role === "perangkat_daerah") {
        // Validasi API Key untuk peran perangkat_daerah
        const validHelpdesk = filteredHelpdesk.filter(
          (item) => item.apiKey === apiKey
        );

        if (validHelpdesk.length === 0) {
          return res.status(403).json({
            status: "error",
            msg: "Forbidden. Invalid API Key for perangkat_daerah role",
          });
        }

        const totalItemsByStatus = {
          divalidasi: filteredHelpdesk.filter(
            (user) => user.submission_status === "Divalidasi"
          ).length,
          diproses: filteredHelpdesk.filter(
            (user) => user.submission_status === "Diproses"
          ).length,
          ditolak: filteredHelpdesk.filter(
            (user) => user.submission_status === "Ditolak"
          ).length,
          disetujui: filteredHelpdesk.filter(
            (user) => user.submission_status === "Disetujui"
          ).length,
        };
        res.json({
          status: "ok",
          msg: "Data Helpdesk retrieved successfully",
          data: validHelpdesk.map(
            ({
              id,
              name_pic,
              submission_title,
              submission_status,
              createdAt,
            }) => ({
              id,
              name_pic,
              submission_title,
              submission_status,
              createdAt,
            })
          ),
          totalItems: validHelpdesk.length,
          totalItemsByStatus: totalItemsByStatus,
        });
      } else {
        // Jika bukan peran perangkat_daerah, kembalikan data tanpa validasi API key
        const totalItemsByStatus = {
          divalidasi: filteredHelpdesk.filter(
            (user) => user.submission_status === "Divalidasi"
          ).length,
          diproses: filteredHelpdesk.filter(
            (user) => user.submission_status === "Diproses"
          ).length,
          ditolak: filteredHelpdesk.filter(
            (user) => user.submission_status === "Ditolak"
          ).length,
          disetujui: filteredHelpdesk.filter(
            (user) => user.submission_status === "Disetujui"
          ).length,
        };
        res.json({
          status: "ok",
          msg: "Data Helpdesk retrieved successfully",
          data: filteredHelpdesk.map(
            ({
              id,
              name_pic,
              helpdesk_title,
              submission_status,
              createdAt,
            }) => ({
              id,
              name_pic,
              helpdesk_title,
              submission_status,
              createdAt,
            })
          ),
          totalItems: filteredHelpdesk.length,
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

export const getDetailInfrastruktur = async (req, res) => {
  try {
    const { id, role } = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        status: "error",
        msg: "API Key is required",
      });
    }
    const helpDeskDetail = await InfraModel.findByPk(id);
    if (!helpDeskDetail) {
      return res.status(404).json({
        status: "error",
        msg: "Help desk item not found",
      });
    }
    const userHasPermission = helpDeskDetail.dataValues.role.includes(role);
    if (!userHasPermission) {
      return res.status(403).json({
        status: "error",
        msg: "You don't have permission to view this detail",
      });
    }
    const filteredDetail = {};
    const propertiesToMoveUp = [
      "createdAt",
      "helpdesk_type",
      "role",
      "helpdesk_title",
    ];
    for (const [key, value] of Object.entries(helpDeskDetail.toJSON())) {
      if (
        value &&
        ![
          "submission_status",
          "id",
          "updatedAt",
          "apiKey",
          "on_process",
          "role",
          "fileuploaded",
          "comment",
        ].includes(key)
      ) {
        filteredDetail[key] = value;
      }
    }
    function rearrangeObject(obj, props) {
      const rearrangedObj = {};
      props.forEach((prop) => {
        if (obj[prop]) {
          rearrangedObj[prop] = obj[prop];
          delete obj[prop];
        }
      });
      return { ...rearrangedObj, ...obj };
    }
    const rearrangedHelpdeskRequest = rearrangeObject(
      filteredDetail,
      propertiesToMoveUp
    );

    const filteredProcess = {};

    for (const [key, value] of Object.entries(helpDeskDetail.toJSON())) {
      if (["work_scheduling", "tool_checking"].includes(key)) {
        filteredProcess[key] = value;
      }
    }

    res.json({
      status: "ok",
      msg: "Data retrieved successfully",
      data: {
        id: id,
        submission_status: helpDeskDetail.submission_status,
        comment: helpDeskDetail.comment,
        fileuploaded: helpDeskDetail.fileuploaded,
        field: rearrangedHelpdeskRequest,
        processing: filteredProcess,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: "Internal Server Error",
    });
  }
};

export const setInfrastruktur = async (req, res) => {
  try {
    let rawInfrastrukturData = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        status: "error",
        msg: "API Key is required",
      });
    }

    if (rawInfrastrukturData.type_tools) {
      rawInfrastrukturData.type_tools = JSON.stringify(
        rawInfrastrukturData.type_tools
      );
    }

    Object.keys(rawInfrastrukturData).forEach((key) => {
      if (rawInfrastrukturData[key] === "") {
        rawInfrastrukturData[key] = null;
      }
    });

    if (
      Array.isArray(rawInfrastrukturData.period) ||
      typeof rawInfrastrukturData.period === "object"
    ) {
      rawInfrastrukturData.period = JSON.stringify(rawInfrastrukturData.period);
    }
    if (
      Array.isArray(rawInfrastrukturData.role) ||
      typeof rawInfrastrukturData.role === "object"
    ) {
      rawInfrastrukturData.role = JSON.stringify(rawInfrastrukturData.role);
    }
    if (
      Array.isArray(rawInfrastrukturData.device_specifications) ||
      typeof rawInfrastrukturData.device_specifications === "object"
    ) {
      rawInfrastrukturData.device_specifications = JSON.stringify(
        rawInfrastrukturData.device_specifications
      );
    }

    rawInfrastrukturData.apiKey = apiKey;
    rawInfrastrukturData.submission_status = "Dalam Antrian";
    rawInfrastrukturData.on_process = 0;
    await InfraModel.create(rawInfrastrukturData);
    res.status(200).json({
      status: "ok",
      msg: "Help desk item created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: "error",
      msg: "Internal Server Error",
    });
  }
};
export const editInfrastruktur = async (req, res) => {
  try {
    const { id, submission_status, comment, fileuploaded } = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        status: "error",
        msg: "API Key is required",
      });
    }
    const helpDeskItem = await InfraModel.findOne({
      where: {
        id: id,
      },
    });
    if (!helpDeskItem) {
      return res.status(404).json({
        status: "error",
        msg: "Help desk item not found",
      });
    }
    console.log(fileuploaded);
    if (helpDeskItem.on_process === 1) {
      helpDeskItem.submission_status = submission_status;
      helpDeskItem.comment = comment;
      helpDeskItem.fileuploaded = fileuploaded;
    }
    await helpDeskItem.save();
    return res.status(200).json({
      status: "ok",
      msg: "Help desk item updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      msg: "Internal Server Error",
    });
  }
};

export const editProcessInfrastruktur = async (req, res) => {
  try {
    const { id } = req.body;
    const { status } = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        status: "error",
        msg: "API Key is required",
      });
    }
    const helpDeskItem = await InfraModel.findOne({
      where: {
        id: id,
      },
    });
    if (!helpDeskItem) {
      return res.status(404).json({
        status: "error",
        msg: "Help desk item not found",
      });
    }
    if (helpDeskItem.on_process === 0) {
      helpDeskItem.on_process = status;
      helpDeskItem.submission_status = "Divalidasi";
    }
    await helpDeskItem.save();
    return res.status(200).json({
      status: "ok",
      msg: "Help desk item updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: "error",
      msg: "Internal Server Error",
    });
  }
};

export const deleteInfrastruktur = async (req, res) => {
  try {
    const { id } = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        status: "error",
        msg: "API Key is required",
      });
    }
    // Cari item help desk
    const helpDeskItem = await InfraModel.findOne({
      where: {
        id: id,
      },
    });

    if (!helpDeskItem) {
      return res.status(404).json({
        status: "error",
        msg: "Help desk item not found",
      });
    }

    // Hapus gambar jika ada
    if (helpDeskItem.image_screenshoot) {
      const fileName = helpDeskItem.image_screenshoot;
      await deleteImage(fileName, "helpdesk");
    }

    // Hapus item help desk
    const deletedItem = await InfraModel.destroy({
      where: {
        id: id,
      },
    });

    if (deletedItem) {
      res.status(200).json({
        status: "ok",
        msg: "Help desk item deleted successfully",
      });
    } else {
      res.status(404).json({
        status: "error",
        msg: "Help desk item not found",
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
