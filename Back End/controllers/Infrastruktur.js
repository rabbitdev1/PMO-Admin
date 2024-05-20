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
          data: validHelpdesk.map((item) => {
            const fields = JSON.parse(item.fields);
            return {
              id: item.id,
              name_pic: fields.name_pic,
              submission_title: item.submission_title,
              submission_status: item.submission_status,
              createdAt: item.createdAt,
            };
          }),
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
          data: filteredHelpdesk.map((item) => {
            const fields = JSON.parse(item.fields);
            return {
              id: item.id,
              name_pic: fields.name_pic,
              submission_title: item.submission_title,
              submission_status: item.submission_status,
              createdAt: item.createdAt,
            };
          }),
          totalItems: filteredHelpdesk.length,
          totalItemsByStatus: totalItemsByStatus,
        });
      }
    }
  } catch (error) {
    console.error(error);
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

    const fields = JSON.parse(helpDeskDetail.fields);
    // Move specific properties to the top of the object
    const propertiesToMoveUp = [
      "createdAt",
      "submission_title",
      "submission_type",
    ];
    const rearrangeObject = (obj, props) => {
      const rearrangedObj = {};
      props.forEach((prop) => {
        if (obj[prop] !== undefined) {
          rearrangedObj[prop] = obj[prop];
          delete obj[prop];
        }
      });
      return { ...rearrangedObj, ...obj };
    };

    // Add createdAt to fields before rearranging
    fields.createdAt = helpDeskDetail.createdAt;
    const rearrangedData = rearrangeObject(fields, propertiesToMoveUp);
    res.json({
      status: "ok",
      msg: "Data retrieved successfully",
      data: {
        id: helpDeskDetail.id,
        submission_status: helpDeskDetail.submission_status,
        comment: helpDeskDetail.comment,
        fileuploaded: helpDeskDetail.fileuploaded,
        fields: rearrangedData,
        on_validation: helpDeskDetail.on_validation,
        on_process: helpDeskDetail.on_process,
        on_finish: helpDeskDetail.on_finish,
      },
    });
  } catch (error) {
    console.error(error); // Log error for debugging purposes
    res.status(500).json({
      status: "error",
      msg: "Internal Server Error",
    });
  }
};

export const setInfrastruktur = async (req, res) => {
  try {
    let rawData = req.body;
    const apiKey = req.headers["x-api-key"];

    if (!apiKey) {
      return res.status(401).json({
        status: "error",
        msg: "API Key is required",
      });
    }
    let processedData = { ...rawData };
    const notAllowedFields = ["role", "apiKey"];
    notAllowedFields.forEach((field) => {
      if (processedData.hasOwnProperty(field)) {
        delete processedData[field];
      }
    });

    console.log("Processed data:", processedData);
    console.log(1, rawData);

    if (Array.isArray(rawData.role) || typeof rawData.role === "object") {
      rawData.role = JSON.stringify(rawData.role);
    }
    rawData.apiKey = apiKey;
    rawData.fields = JSON.stringify(processedData);
    rawData.submission_status = 1;
    rawData.on_process = JSON.stringify({});
    rawData.on_validation = JSON.stringify({});
    rawData.on_finish = JSON.stringify({});

    await InfraModel.create(rawData);
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
    const { id, type, data } = req.body;
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
        msg: "Item not found",
      });
    }
    const convertData = JSON.parse(data);
    console.log(convertData);
    if (type === "validation") {
      if (convertData.status_validation === "Disetujui") {
        helpDeskItem.submission_status = 4;
      } else if (convertData.status_validation === "Ditolak") {
        helpDeskItem.submission_status = 3;
      }
      helpDeskItem.on_validation = data;
    } else if (type === "process") {
      helpDeskItem.on_process = data;
    } else if (type === "finish") {
      if (convertData.submission_status === "Disetujui") {
        helpDeskItem.submission_status = 5;
      } else if (convertData.submission_status === "Ditolak") {
        helpDeskItem.submission_status = 6;
      }
      helpDeskItem.on_finish = data;
    }
    await helpDeskItem.save();
    return res.status(200).json({
      status: "ok",
      msg: "Item updated successfully",
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
    if (parseInt(helpDeskItem.submission_status) === 1) {
      console.log("jalan");
      helpDeskItem.submission_status = 2;
      await helpDeskItem.save();
    }
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
    const { id, layanan } = req.body;
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

    const mergedDataProcess = {
      ...JSON.parse(helpDeskItem.on_validation),
      ...JSON.parse(helpDeskItem.on_process),
      ...JSON.parse(helpDeskItem.on_finish),
    };
    console.log("Merged Data:", mergedDataProcess);
    const findValueByTitle = (data, title) => data[title];

    const fileUploadValue = findValueByTitle(mergedDataProcess, "file_upload");
    const imageScreenshotValue = findValueByTitle(
      mergedDataProcess,
      "image_screenshot"
    );
    const foundValue = fileUploadValue || imageScreenshotValue;
    if (foundValue) {
      await deleteImage(foundValue, layanan);
    } else {
      console.log("Data tidak ditemukan");
    }

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
