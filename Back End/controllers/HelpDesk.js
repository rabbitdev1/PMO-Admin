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
    const apiKey = req.headers["x-api-key"];
    if (!apiKey) {
      return res.status(401).json({
        status: "error",
        msg: "API Key is required",
      });
    }

    const helpdesk = await ListHelpdesk.findAll({
      attributes: [
        "id",
        "name_pic",
        "helpdesk_title",
        "submission_status",
        "createdAt",
      ],
    });
    const totalItems = helpdesk.length;
    const totalItemsByStatus = {
      diproses: helpdesk.filter((user) => user.submission_status === "Diproses")
        .length,
      ditolak: helpdesk.filter((user) => user.submission_status === "Ditolak")
        .length,
      disetujui: helpdesk.filter(
        (user) => user.submission_status === "Disetujui"
      ).length,
    };
    res.json({
      status: "ok",
      msg: "Data Helpdesk retrieved successfully",
      data: helpdesk,
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

export const getDetailHelpDesk = async (req, res) => {
  try {
    const { id } = req.body;
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

    const filteredDetail = {};
    for (const [key, value] of Object.entries(helpDeskDetail.toJSON())) {
      if (value !== null && value !== undefined && value !== "") {
        if (key === "submission_status" || key === "id") {
        } else {
          filteredDetail[key] = value;
        }
      }
    }

    res.json({
      status: "ok",
      msg: "Data retrieved successfully",
      data: {
        id: id,
        submission_status: helpDeskDetail.submission_status,
        comment: helpDeskDetail.comment,
        field: filteredDetail,
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
      Array.isArray(rawHelpDeskData.device_specifications) ||
      typeof rawHelpDeskData.device_specifications === "object"
    ) {
      rawHelpDeskData.device_specifications = JSON.stringify(
        rawHelpDeskData.device_specifications
      );
    }

    rawHelpDeskData.submission_status = "Dalam Antrian";
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

// export const deleteHelpDesk = async (req, res) => {
//   try {
//     const { id } = req.body;
//     const deletedItem = await ListHelpdesk.destroy({
//       where: {
//         id: id,
//       },
//     });

//     if (deletedItem) {
//       res.status(200).json({
//         status: "ok",
//         msg: "Help desk item deleted successfully",
//       });
//     } else {
//       res.status(404).json({
//         status: "error",
//         msg: "Help desk item not found",
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       status: "error",
//       msg: "Internal Server Error",
//     });
//   }
// };

export const deleteHelpDesk = async (req, res) => {
  try {
    const { id } = req.body;

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
      await deleteImage(fileName);
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
