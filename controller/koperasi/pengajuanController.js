const {
  models: { pengajuan, loginModel, masterNasabah },
} = require("../../model/index.js");
const { Sequelize } = require("sequelize");

module.exports = {
  // Add a new Pengajuan entry
  addPengajuan: async (req, res) => {
    const {
      id_users,
      id_mst_nasabah,
      penjualan,
      hargaPokok,
      biaya,
      labaUsaha,
      pendapatanLain,
      jumlahPendapatan,
      kebutuhanRumahTangga,
      biayaPendidikan,
      biayaLainya,
      jumlahBiayaLuarUsaha,
      pendapatanBersih,
      rasioAngsuran,
      jangkaWaktu,
      nominalPermohonan,
      tujuanPembiayaan,
      jaminan,
      accPermohonan,
      nomorAkad,
      status,
      statusAt,
    } = req.body;

    try {
      const add = await pengajuan.create({
        id_users,
        id_mst_nasabah,
        penjualan,
        hargaPokok,
        biaya,
        labaUsaha,
        pendapatanLain,
        jumlahPendapatan,
        kebutuhanRumahTangga,
        biayaPendidikan,
        biayaLainya,
        jumlahBiayaLuarUsaha,
        pendapatanBersih,
        rasioAngsuran,
        jangkaWaktu,
        nominalPermohonan,
        tujuanPembiayaan,
        jaminan,
        accPermohonan,
        nomorAkad,
        status,
        statusAt,
      });
      res.json(add);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error adding Pengajuan: " + error.message });
    }
  },

  // Get all Pengajuan entries
  getPengajuan: async (req, res) => {
    try {
      const { id_users } = req.params;
      // console.log(id_users, 'iddd')

      // If id_user is provided, filter by it
      const queryOptions = {
        attributes: [
          "id_angsurans",
          "id_user",
          "nomorAkad",
          "staffBasil",
          "staffPokok",
          "accBasil",
          "accPokok",
          "staffBy",
          "staffAt",
          "kasirBy",
          "kasirAtt",
          "lokasiPembayaran",
        ],
      };

      if (id_users) {
        queryOptions.where = { id_users }; // Add the condition to filter by id_user
      }

      const get = await pengajuan.findAll({
        include: [
          {
            model: loginModel,
            as: "user",
            attributes: ["id_users", "username"], // Ambil atribut yang diperlukan
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
            ], // Ambil atribut yang diperlukan
          },
        ],
        attributes: [
          "id_pengajuans",
          "penjualan",
          "hargaPokok",
          "biaya",
          "labaUsaha",
          "pendapatanLain",
          "jumlahPendapatan",
          "kebutuhanRumahTangga",
          "biayaPendidikan",
          "biayaLainya",
          "jumlahBiayaLuarUsaha",
          "pendapatanBersih",
          "rasioAngsuran",
          "jangkaWaktu",
          "nominalPermohonan",
          "tujuanPembiayaan",
          "jaminan",
          "accPermohonan",
          "nomorAkad",
          "status",
          "statusAt",
        ],
      });

      // const get = await angsuran.findAll(queryOptions);
      // const val = get.map(value => ({
      //     ...value.dataValues,
      //     nomorAkad: value.nomorAkad ? JSON.parse(value.nomorAkad) : null
      // }));
      res.json(get);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getApprovelPengajuan: async (req, res) => {
    try {
      const { id_users } = req.params;
      // console.log(id_users, 'iddd')

      // If id_user is provided, filter by it
      const queryOptions = {
        attributes: [
          "id_angsurans",
          "id_user",
          "nomorAkad",
          "staffBasil",
          "staffPokok",
          "accBasil",
          "accPokok",
          "staffBy",
          "staffAt",
          "kasirBy",
          "kasirAtt",
          "lokasiPembayaran",
        ],
      };

      if (id_users) {
        queryOptions.where = { id_users }; // Add the condition to filter by id_user
      }

      const get = await pengajuan.findAll({
        include: [
          {
            model: loginModel,
            as: "user",
            attributes: ["id_users", "username"], // Ambil atribut yang diperlukan
          },
          {
            model: masterNasabah,
            as: "nasabah",
            attributes: ["id_mst_nasabah", "nama", "mstNik", "mstRekening"], // Ambil atribut yang diperlukan
          },
        ],
        attributes: [
          "id_pengajuans",
          "pendapatanBersih",
          "rasioAngsuran",
          "jangkaWaktu",
          "nominalPermohonan",
          "jaminan",
          "status",
          "statusAt",
        ],
      });

      // const get = await angsuran.findAll(queryOptions);
      // const val = get.map(value => ({
      //     ...value.dataValues,
      //     nomorAkad: value.nomorAkad ? JSON.parse(value.nomorAkad) : null
      // }));
      res.json(get);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Update Pengajuan status by ID
  approvalPengajuan: async (req, res) => {
    const id_pengajuans = req.params.id;

    try {
      const { status } = req.body;
      const update = await pengajuan.update(
        { status },
        {
          where: { id_pengajuans },
        }
      );
      res.json(update);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error updating status: " + error.message });
    }
  },

  // Get Pengajuan entries with a non-null nomorAkad
  getPengajuanByNoAkad: async (req, res) => {
    try {
      const get = await pengajuan.findAll({
        where: {
          nomorAkad: { [Sequelize.Op.not]: null },
        },
        attributes: ["id_pengajuans", "nomorAkad", "id_mst_nasabah"],
      });
      res.json(get);
    } catch (error) {
      res.status(500).json({
        error: "Error fetching Pengajuan by No Akad: " + error.message,
      });
    }
  },

  // Update Pengajuan by ID
  putPengajuan: async (req, res) => {
    const id_pengajuans = req.params.id;
    const {
      id_users,
      id_mst_nasabah,
      penjualan,
      hargaPokok,
      biaya,
      labaUsaha,
      pendapatanLain,
      jumlahPendapatan,
      kebutuhanRumahTangga,
      biayaPendidikan,
      biayaLainya,
      jumlahBiayaLuarUsaha,
      pendapatanBersih,
      rasioAngsuran,
      jangkaWaktu,
      nominalPermohonan,
      tujuanPembiayaan,
      jaminan,
      accPermohonan,
      nomorAkad,
      status,
      statusAt,
    } = req.body;

    try {
      const update = await pengajuan.update(
        {
          id_users,
          id_mst_nasabah,
          penjualan,
          hargaPokok,
          biaya,
          labaUsaha,
          pendapatanLain,
          jumlahPendapatan,
          kebutuhanRumahTangga,
          biayaPendidikan,
          biayaLainya,
          jumlahBiayaLuarUsaha,
          pendapatanBersih,
          rasioAngsuran,
          jangkaWaktu,
          nominalPermohonan,
          tujuanPembiayaan,
          jaminan,
          accPermohonan,
          nomorAkad,
          status,
          statusAt,
        },
        {
          where: { id_pengajuans },
        }
      );
      res.json(update);
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error updating Pengajuan: " + error.message });
    }
  },

  // Delete Pengajuan by ID
  deletePengajuan: async (req, res) => {
    const id_pengajuans = req.params.id;

    try {
      const del = await pengajuan.destroy({
        where: { id_pengajuans },
      });
      res.json({
        message: `Pengajuan with id ${id_pengajuans} deleted successfully.`,
      });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error deleting Pengajuan: " + error.message });
    }
  },
};
