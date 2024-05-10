import { ListSecurityTesting } from "../models/PengajuanKeamananModel.js";

// Create
export const createListSecurityTesting = async (req, res) => {
  try {
    const newData = await ListSecurityTesting.create({
      pic_name: req.body.pic_name,
      pic_number: req.body.pic_number,
      api_key: req.body.api_key,
      app_name: req.body.app_name,
      app_description: req.body.app_description,
      app_version: req.body.app_version,
      app_ownership: req.body.app_ownership,
      username: req.body.username,
      password: req.body.password,
      domain_url: req.body.domain_url,
      businees_process_document: req.body.businees_process_document,
    });

    return res.status(201).json({
      message: "Pengajuan Keamanan SI berhasil disubmit!",
      status: "ok",
      data: newData,
    });
  } catch (error) {
    return res.status(400).json({
      status: "Error!",
      error: error.message,
    });
  }
};

export const getListSecurityTesting = async (req, res) => {
  try {
    const allData = await ListSecurityTesting.findAll();
    return res.status(200).json({
      status: "ok",
      data: allData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error!",
      error: error.message,
    });
  }
};

export const getDetailDataListSecurityTesting = async (req, res) => {
  try {
    const id = req.params.id;
    const detailData = await ListSecurityTesting.findByPk(id);
    console.log(detailData);

    if (!detailData) {
      return res.status(404).json({
        status: "Error",
        error: "Validasi error",
        message: `Data dengan id ${id} tidak ditemukan`,
      });
    }

    return res.status(200).json({
      status: "success",
      data: detailData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      error: error.message,
    });
  }
};

export const updateListSecurityTesting = async (req, res) => {
  try {
    const id = req.params.id;
    const {
        pic_name,
        pic_number,
        apiKey,
        app_name,
        app_description,
        app_version,
        app_ownership,
        username,
        password,
        domain_url,
        business_process_document,
    } = req.body;

    await PengajuanPermohonanSi.update(
      {
        pic_name,
        pic_number,
        apiKey,
        app_name,
        app_description,
        app_version,
        app_ownership,
        username,
        password,
        domain_url,
        business_process_document,
      },
      {
        where: {
          id: id,
        },
      }
    );

    const existingData = await ListSecurityTesting.findByPk(id);
    if (!existingData) {
      return res.status(404).json({
        status: "Error",
        error: "Validasi error",
        message: `Data dengan id ${id} tidak ditemukan`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Data berhasil diupdate",
      data: existingData,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      error: error.message,
    });
  }
};

export const deleteListSecurityTesting = async (req, res) => {
    try {
      const { id } = req.params;
  
      const listSecurityTesting = await ListSecurityTesting.findByPk(id);
  
      if (!listSecurityTesting) {
        return res.status(404).json({
          status: 'error',
          msg: `data dengan id ${id} tidak ada`,
        });
      }
  
      await listSecurityTesting.destroy();
  
      res.json({
        status: 'Success',
        msg: `data dengan id ${id} berhasil dihapus`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        status: 'error',
        msg: 'Internal Server Error',
      });
    }
  };