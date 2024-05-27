

import InfraModel from "../../models/InfraModel.js";

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
  