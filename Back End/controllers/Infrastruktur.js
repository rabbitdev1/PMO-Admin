import { deleteFiles } from "../components/UploadFile.js";
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
      const infrastruktur = await InfraModel.findAll();

      // Memeriksa apakah peran pengguna termasuk dalam peran yang diizinkan
      const filteredinfrastruktur = infrastruktur.filter((item) => {
        if (!item.role) return false; // Jika item tidak memiliki role, maka tidak dimasukkan ke dalam respons
        const itemRoles = JSON.parse(item.role);
        return itemRoles.includes(role);
      });

      if (role === "perangkat_daerah") {
        // Validasi API Key untuk peran perangkat_daerah
        const validinfrastruktur = filteredinfrastruktur.filter(
          (item) => item.apiKey === apiKey
        );

        if (validinfrastruktur.length === 0) {
          return res.status(400).json({
            status: "error",
            msg: "Item not found",
          });
        }

        const totalItemsByStatus = {
          divalidasi: filteredinfrastruktur.filter(
            (user) => user.submission_status === "Divalidasi"
          ).length,
          diproses: filteredinfrastruktur.filter(
            (user) => user.submission_status === "Diproses"
          ).length,
          ditolak: filteredinfrastruktur.filter(
            (user) => user.submission_status === "Ditolak"
          ).length,
          disetujui: filteredinfrastruktur.filter(
            (user) => user.submission_status === "Disetujui"
          ).length,
        };
        res.json({
          status: "ok",
          msg: "Data infrastruktur retrieved successfully",
          data: validinfrastruktur.map((item) => {
            const fields = JSON.parse(item.fields);
            return {
              id: item.id,
              name_pic: fields.name_pic,
              submission_title: item.submission_title,
              submission_status: item.submission_status,
              createdAt: item.createdAt,
            };
          }),
          totalItems: validinfrastruktur.length,
          totalItemsByStatus: totalItemsByStatus,
        });
      } else {
        // Jika bukan peran perangkat_daerah, kembalikan data tanpa validasi API key
        const totalItemsByStatus = {
          divalidasi: filteredinfrastruktur.filter(
            (user) => user.submission_status === "Divalidasi"
          ).length,
          diproses: filteredinfrastruktur.filter(
            (user) => user.submission_status === "Diproses"
          ).length,
          ditolak: filteredinfrastruktur.filter(
            (user) => user.submission_status === "Ditolak"
          ).length,
          disetujui: filteredinfrastruktur.filter(
            (user) => user.submission_status === "Disetujui"
          ).length,
        };
        res.json({
          status: "ok",
          msg: "Data infrastruktur retrieved successfully",
          data: filteredinfrastruktur.map((item) => {
            const fields = JSON.parse(item.fields);
            return {
              id: item.id,
              name_pic: fields.name_pic,
              submission_title: item.submission_title,
              submission_status: item.submission_status,
              createdAt: item.createdAt,
            };
          }),
          totalItems: filteredinfrastruktur.length,
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

    const infrastrukturDetail = await InfraModel.findByPk(id);
    if (!infrastrukturDetail) {
      return res.status(404).json({
        status: "error",
        msg: "Item not found",
      });
    }

    const userHasPermission = infrastrukturDetail.dataValues.role.includes(role);
    if (!userHasPermission) {
      return res.status(403).json({
        status: "error",
        msg: "You don't have permission to view this detail",
      });
    }

    const fields = JSON.parse(infrastrukturDetail.fields);
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
    fields.createdAt = infrastrukturDetail.createdAt;
    const rearrangedData = rearrangeObject(fields, propertiesToMoveUp);
    res.json({
      status: "ok",
      msg: "Data retrieved successfully",
      data: {
        id: infrastrukturDetail.id,
        submission_status: infrastrukturDetail.submission_status,
        comment: infrastrukturDetail.comment,
        fileuploaded: infrastrukturDetail.fileuploaded,
        fields: rearrangedData,
        on_validation: infrastrukturDetail.on_validation,
        on_process: infrastrukturDetail.on_process,
        on_finish: infrastrukturDetail.on_finish,
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
    rawData.on_validation = JSON.stringify({ statusValidasi: "1" });
    rawData.on_finish = JSON.stringify({ submission_status: "0" });

    await InfraModel.create(rawData);
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
    const infrastrukturItem = await InfraModel.findOne({
      where: {
        id: id,
      },
    });
    if (!infrastrukturItem) {
      return res.status(404).json({
        status: "error",
        msg: "Item not found",
      });
    }
    const convertData = JSON.parse(data);
    console.log(convertData);
    if (type === "validation") {
      if (convertData.status_validation === "Disetujui") {
        infrastrukturItem.submission_status = 4;
      } else if (convertData.status_validation === "Ditolak") {
        infrastrukturItem.submission_status = 3;
      }
      infrastrukturItem.on_validation = data;
    } else if (type === "process") {
      infrastrukturItem.on_process = data;
    } else if (type === "finish") {
      if (convertData.submission_status === "Disetujui") {
        infrastrukturItem.submission_status = 5;
      } else if (convertData.submission_status === "Ditolak") {
        infrastrukturItem.submission_status = 6;
      }
      infrastrukturItem.on_finish = data;
    }
    await infrastrukturItem.save();
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
    const infrastrukturItem = await InfraModel.findOne({
      where: {
        id: id,
      },
    });
    if (!infrastrukturItem) {
      return res.status(404).json({
        status: "error",
        msg: "Item not found",
      });
    }
    if (parseInt(infrastrukturItem.submission_status) === 1) {
      console.log("jalan");
      infrastrukturItem.submission_status = 2;
      await infrastrukturItem.save();
    }
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

    const infrastrukturItem = await InfraModel.findOne({
      where: {
        id: id,
      },
    });

    if (!infrastrukturItem) {
      return res.status(404).json({
        status: "error",
        msg: "Item not found",
      });
    }

    const mergedDataProcess = {
      ...JSON.parse(infrastrukturItem.on_validation),
      ...JSON.parse(infrastrukturItem.on_process),
      ...JSON.parse(infrastrukturItem.on_finish),
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
      await deleteFiles(foundValue, layanan);
      console.log("Data ditemukan");
      console.log(foundValue, layanan);
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
        msg: "Item deleted successfully",
      });
    } else {
      res.status(404).json({
        status: "error",
        msg: "Item not found",
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
