const Joi = require("joi");
const loginModels = require("../../model/Auth/loginModels.js");
const {
  models: { permohonan, masterNasabah, loginModel },
} = require("../../model/index.js");

module.exports = {
  addPermohonan: async (req, res) => {
    try {
      const {
        id_users,
        id_mst_nasabah,
        statusPermohonan,
        hasilPermohonan,
        persentase,
        saldoTabungan,
      } = req.body;

      // Validasi apakah id_users ada dalam tabel tb_users
      const userExists = await loginModel.findOne({
        where: { id_users },
      });
      if (!userExists) {
        return res.status(400).json({ error: "User not found" });
      }

      // Validasi apakah id_mst_nasabah ada dalam tabel tb_mst_nasabah
      const nasabahExists = await masterNasabah.findOne({
        where: { id_mst_nasabah },
      });
      if (!nasabahExists) {
        return res.status(400).json({ error: "Nasabah not found" });
      }

      // Jika user dan nasabah ada, lanjutkan untuk membuat permohonan
      const add = await permohonan.create({
        id_users,
        id_mst_nasabah,
        statusPermohonan,
        hasilPermohonan,
        persentase,
        saldoTabungan,
      });

      res.json(add);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getPermohonan: async (req, res) => {
    const { id_users } = req.params;
    const queryOptions = {
      attributes: [
        "id_permohonans",
        "statusPermohonan",
        "hasilPermohonan",
        "persentase",
        "saldoTabungan",
      ],
    };

    try {
      if (id_users) {
        queryOptions.where = { id_users }; // Filter by id_users
      }

      const get = await permohonan.findAll({
        include: [
          {
            model: loginModel,
            as: "user",
            attributes: ["id_users", "username"], // Fetch only necessary attributes
          },
          {
            model: masterNasabah,
            as: "nasabah",
            attributes: [
              "id_mst_nasabah",
              "nama",
              "mstNik",
              "mstRekening",
              "mstjenisKelamin",
              "mstAlamat",
              "mstKecamatan",
              "mstKabupaten",
              "mstProvinsi",
            ], // Fetch only necessary attributes
          },
        ],
        attributes: [
          "id_permohonans",
          "statusPermohonan",
          "hasilPermohonan",
          "persentase",
          "saldoTabungan",
        ],
      });

      if (get.length === 0) {
        return res
          .status(404)
          .json({ message: "Data permohonan tidak ditemukan" });
      }

      res.status(200).json(get);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Internal Server Error", message: error.message });
    }
  },

  getPermohonanByApprove: async (req, res) => {
    try {
      const getPermohonan = await permohonan.findAll({
        where: { hasilPermohonan: true },
        include: [
          {
            model: loginModel,
            as: "user",
            attributes: ["id_users", "username"], // Fetch only necessary attributes
          },
          {
            model: masterNasabah,
            as: "nasabah",
            attributes: [
              "id_mst_nasabah",
              "nama",
              "mstNik",
              "mstRekening",
              "mstjenisKelamin",
              "mstAlamat",
              "mstKecamatan",
              "mstKabupaten",
              "mstProvinsi",
            ], // Fetch only necessary attributes
          },
        ],
        attributes: [
          "id_permohonans",
          "statusPermohonan",
          "saldoTabungan",
        ],
      });

      res.json(getPermohonan);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  putPermohonan: async (req, res) => {
    try {
      const id = req.params.id;
      const {
        id_users,
        id_mst_nasabah,
        statusPermohonan,
        hasilPermohonan,
        persentase,
        saldoTabungan,
      } = req.body;

      // Validasi apakah id_users ada dalam tabel tb_users
      const userExists = await loginModel.findOne({
        where: { id_users },
      });
      if (!userExists) {
        return res.status(400).json({ error: "User not found" });
      }

      // Validasi apakah id_mst_nasabah ada dalam tabel tb_mst_nasabah
      const nasabahExists = await masterNasabah.findOne({
        where: { id_mst_nasabah },
      });
      if (!nasabahExists) {
        return res.status(400).json({ error: "Nasabah not found" });
      }

      // Jika valid, lakukan update permohonan
      const put = await permohonan.update(
        {
          id_users,
          id_mst_nasabah,
          statusPermohonan,
          hasilPermohonan,
          persentase,
          saldoTabungan,
        },
        {
          where: {
            id_permohonans: id,
          },
        }
      );

      res.json(put);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  approvalPermohonan: async (req, res) => {
    try {
      const id = req.params.id;
      const { statusPermohonan, hasilPermohonan, persentase } = req.body;

      // Define validation schema
      const schema = Joi.object({
        statusPermohonan: Joi.string().valid(true, false).required(),
        hasilPermohonan: Joi.string().required(),
        persentase: Joi.number().min(0).max(100).required(),
      });

      // Validate request body against schema
      const { error } = schema.validate({
        statusPermohonan,
        hasilPermohonan,
        persentase,
      });
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }

      const put = await permohonan.update(
        {
          statusPermohonan,
          persentase,
          hasilPermohonan,
        },
        {
          where: {
            id_permohonans: id,
          },
        }
      );

      if (put[0] === 0) {
        return res
          .status(404)
          .json({ error: "Permohonan not found or no changes made" });
      }

      res.json({ success: true, message: "Permohonan updated successfully" });
    } catch (error) {
      console.error(error); // For logging purposes
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  },

  deletePermohonan: async (req, res) => {
    try {
      const id = req.params.id;

      // Validate ID (ensure it's a valid number)
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const del = await permohonan.destroy({
        where: {
          id_permohonans: id,
        },
      });

      if (del === 0) {
        return res.status(404).json({ error: "Permohonan not found" });
      }

      res.json({ success: true, message: "Permohonan deleted successfully" });
    } catch (error) {
      console.error(error); // For logging purposes
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    }
  },
};
