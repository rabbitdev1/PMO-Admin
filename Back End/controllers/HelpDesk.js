import { deleteImage } from "../components/UploadImage.js";
import { HelpDeskFaq, ListHelpdesk } from "../models/HelpdeskModel.js";

export const getFaq = async (req, res) => {
  try {
    const faq = await HelpDeskFaq.findAll({
      attributes: ["id", "title", "answer"],
    });
    res.json({
      status: "ok",
      msg: "Data retrieved successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      msg: "Internal Server Error",
    });
  }
};
export const getListHelpDesk = async (req, res) => {
  try {
    const { role } = req.body;
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
      return res.status(401).json({
        status: "error",
        msg: "API Key is required",
      });
    } else {
      const helpdesk = await ListHelpdesk.findAll();

      // Memeriksa apakah peran pengguna termasuk dalam peran yang diizinkan
      const filteredHelpdesk = helpdesk.filter((item) => {
        if (!item.role) return false; // Jika item tidak memiliki role, maka tidak dimasukkan ke dalam respons
        const itemRoles = JSON.parse(item.role);
        return itemRoles.includes(role);
      });

      if (role === "OPD") {
        // Validasi API Key untuk peran OPD
        const validHelpdesk = filteredHelpdesk.filter(
          (item) => item.apiKey === apiKey
        );

        if (validHelpdesk.length === 0) {
          return res.status(403).json({
            status: "error",
            msg: "Forbidden. Invalid API Key for OPD role",
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
          totalItems: validHelpdesk.length,
          totalItemsByStatus: totalItemsByStatus,
        });
      } else {
        // Jika bukan peran OPD, kembalikan data tanpa validasi API key
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

export const getDetailHelpDesk = async (req, res) => {
  try {
    const { id, role } = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        status: "error",
        msg: "API Key is required",
      });
    }
    const helpDeskDetail = await ListHelpdesk.findByPk(id);
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

export const setHelpDesk = async (req, res) => {
  try {
    let rawHelpDeskData = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        status: "error",
        msg: "API Key is required",
      });
    }

    if (rawHelpDeskData.type_tools) {
      rawHelpDeskData.type_tools = JSON.stringify(rawHelpDeskData.type_tools);
    }

    Object.keys(rawHelpDeskData).forEach((key) => {
      if (rawHelpDeskData[key] === "") {
        rawHelpDeskData[key] = null;
      }
    });

    if (
      Array.isArray(rawHelpDeskData.period) ||
      typeof rawHelpDeskData.period === "object"
    ) {
      rawHelpDeskData.period = JSON.stringify(rawHelpDeskData.period);
    }
    if (
      Array.isArray(rawHelpDeskData.role) ||
      typeof rawHelpDeskData.role === "object"
    ) {
      rawHelpDeskData.role = JSON.stringify(rawHelpDeskData.role);
    }
    if (
      Array.isArray(rawHelpDeskData.device_specifications) ||
      typeof rawHelpDeskData.device_specifications === "object"
    ) {
      rawHelpDeskData.device_specifications = JSON.stringify(
        rawHelpDeskData.device_specifications
      );
    }

    rawHelpDeskData.apiKey = apiKey;
    rawHelpDeskData.submission_status = "Dalam Antrian";
    rawHelpDeskData.on_process = 0;
    await ListHelpdesk.create(rawHelpDeskData);
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
export const editHelpDesk = async (req, res) => {
  try {
    const { id, submission_status, comment, fileuploaded } = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        status: "error",
        msg: "API Key is required",
      });
    }
    const helpDeskItem = await ListHelpdesk.findOne({
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

export const editProcessHelpDesk = async (req, res) => {
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
    const helpDeskItem = await ListHelpdesk.findOne({
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

export const deleteHelpDesk = async (req, res) => {
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
    const helpDeskItem = await ListHelpdesk.findOne({
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
    const deletedItem = await ListHelpdesk.destroy({
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
