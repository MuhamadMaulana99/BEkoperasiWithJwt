const { Op } = require("sequelize");
const {
  models: { masterNasabah },
} = require("../../model/index.js");

module.exports = {
  addNasabah: async (req, res) => {
    const {
      nama,
      mstRekening,
      mstNik,
      mstjenisKelamin,
      mstAlamat,
      mstKecamatan,
      mstKabupaten,
      mstProvinsi,
    } = req.body;
    try {
      // Cek apakah ada nasabah dengan nama, mstRekening, atau mstNik yang sama
      const existingNasabah = await masterNasabah.findOne({
        where: {
          [Op.or]: [
            { nama: nama },
            { mstRekening: mstRekening },
            { mstNik: mstNik },
          ],
        },
      });
      if (existingNasabah) {
        return res.status(400).json({
          message: "Data nasabah sudah ada.",
          error: "Nama, Rekening, atau NIK sudah terdaftar.",
        });
      }
      // Jika tidak ada yang sama, tambahkan nasabah baru
      const add = await masterNasabah.create({
        nama,
        mstRekening,
        mstNik,
        mstjenisKelamin,
        mstAlamat,
        mstKecamatan,
        mstKabupaten,
        mstProvinsi,
      });

      return res.status(201).json(add); // Mengembalikan status 201 untuk data yang berhasil ditambahkan
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal Server Error",
        errorMessage: error.message,
      });
    }
  },
  getNasabah: async (req, res) => {
    try {
      const get = await masterNasabah.findAll({
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
        ],
      });
      const val = get?.map((value) => {
        return {
          ...value.dataValues,
          mstjenisKelamin: JSON.parse(value?.mstjenisKelamin),
        };
      });

      return res.json(val);
    } catch (error) {
      console.error(error); // Mencetak kesalahan ke konsol untuk debugging
      return res.status(500).json({
        message: "Internal Server Error", // Mengembalikan pesan kesalahan
        errorMessage: error.message, // Mengembalikan detail kesalahan
      });
    }
  },
  // getNasabah: async (req, res) => {
  //   const get = await masterNasabah.findAll({
  //     attributes: ['id_mst_nasabah', 'nama', 'mstNik', 'mstRekening', 'mstjenisKelamin', 'mstAlamat', 'mstKecamatan', 'mstKabupaten', 'mstProvinsi']
  //   })
  //   const val = get?.map((value)=> {
  //     return {
  //       ...value.dataValues,
  //       mstjenisKelamin: JSON.parse(value?.mstjenisKelamin)
  //     }
  //   })
  //   res.json(val)
  // },
  getNasabahId: async (req, res, next) => {
    const { id } = req.params;
    try {
      const get = await masterNasabah.findOne({
        where: { id_mst_nasabah: id },
      });

      if (get) {
        return res.status(200).json(get);
      } else {
        return res.status(404).json({ message: "Record not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  getNasabahRekening: async (req, res, next) => {
    const { mstRekening } = req.params;
    try {
      const get = await masterNasabah.findOne({ where: { mstRekening } });

      if (get) {
        return res.status(200).json(get);
      } else {
        return res.status(404).json({ message: "Record not found" });
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  },
  putNasabah: async (req, res) => {
    const { id } = req.params;
    const {
      nama,
      mstNik,
      mstRekening,
      mstjenisKelamin,
      mstAlamat,
      mstKecamatan,
      mstKabupaten,
      mstProvinsi,
    } = req.body;

    try {
      // Cek apakah data nasabah dengan ID tersebut ada
      const nasabah = await masterNasabah.findOne({
        where: { id_mst_nasabah: id },
      });

      if (!nasabah) {
        return res.status(404).json({
          message: "Nasabah tidak ditemukan",
          error: `Nasabah dengan ID ${id} tidak ada di database`,
        });
      }

      // Update data
      await masterNasabah.update(
        {
          nama,
          mstNik,
          mstRekening,
          mstjenisKelamin,
          mstAlamat,
          mstKecamatan,
          mstKabupaten,
          mstProvinsi,
        },
        {
          where: { id_mst_nasabah: id },
        }
      );

      // Ambil data terbaru setelah update
      const updatedNasabah = await masterNasabah.findOne({
        where: { id_mst_nasabah: id },
      });

      return res.status(200).json(updatedNasabah);
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({
        message: "Internal Server Error",
        errorMessage: error.message,
      });
    }
  },

  deleteNasabah: async (req, res) => {
    const id = req.params.id;

    try {
      // Cek apakah nasabah dengan ID tersebut ada
      const nasabah = await masterNasabah.findOne({
        where: { id_mst_nasabah: id },
      });

      // Jika nasabah tidak ditemukan, kembalikan respons 404
      if (!nasabah) {
        return res.status(404).json({
          message: "Nasabah tidak ditemukan",
          error: `Nasabah dengan ID ${id} tidak ada di database`,
        });
      }

      // Hapus nasabah
      await masterNasabah.destroy({
        where: { id_mst_nasabah: id },
      });

      // Kembalikan respons sukses
      return res.status(200).json({
        message: "Nasabah berhasil dihapus",
        deletedId: id,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Internal Server Error",
        errorMessage: error.message,
      });
    }
  },
};
