// const loginModels = require('../../model/Auth/loginModels.js');
const {
  models: {
    permohonan,
    masterNasabah,
    loginModel
  }
} = require('../../model/index.js');

module.exports = {
  addPermohonan: async (req, res) => {
    try {
      const {
        id_users,
        id_mst_nasabah,
        jenisKelamin,
        alamat,
        kecamatan,
        kabupaten,
        provinsi,
        statusPermohonan,
        hasilPermohonan,
        persentase,
        saldoTabungan
      } = req.body;

      const add = await permohonan.create({
        id_users,
        id_mst_nasabah,
        jenisKelamin,
        alamat,
        kecamatan,
        kabupaten,
        provinsi,
        statusPermohonan,
        hasilPermohonan,
        persentase,
        saldoTabungan
      });

      res.json(add);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getPermohonan: async (req, res) => {
    const { id_users } = req.params;
    // console.log(id_users, 'iss')
    const queryOptions = {
      attributes: ['id_permohonans', 'jenisKelamin', 'alamat', 'kecamatan', 'kabupaten', 'provinsi', 'statusPermohonan', 'hasilPermohonan', 'persentase', 'saldoTabungan']
  };
    try {
      if (id_users) {
        queryOptions.where = { id_users }; // Add the condition to filter by id_user
      }
      const get = await permohonan.findAll({
        include: [
          {
            model: loginModel,
            as: 'user',
            attributes: ['id_users', 'username'], // Hanya ambil atribut yang diperlukan dari user
          },
          {
            model: masterNasabah,
            as: 'nasabah',
            attributes: ['id_mst_nasabah', 'nama', 'mstNik', 'mstRekening', 'mstjenisKelamin', 'mstAlamat', 'mstKecamatan', 'mstKabupaten', 'mstProvinsi'], // Hanya ambil atribut yang diperlukan dari nasabah
          },
        ],
        attributes: ['id_permohonans', 'jenisKelamin', 'alamat', 'kecamatan', 'kabupaten', 'provinsi', 'statusPermohonan', 'hasilPermohonan', 'persentase', 'saldoTabungan'],
      });

      // Cek jika tidak ada data ditemukan
      if (get.length === 0) {
        return res.status(404).json({ message: 'Data permohonan tidak ditemukan' });
      }

      res.status(200).json(get);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  },


  getPermohonanByApprove: async (req, res) => {
    try {
      const getPermohonan = await permohonan.findAll({
        where: { hasilPermohonan: true },
        attributes: ['id_permohonans', 'id_users', 'id_mst_nasabah', 'jenisKelamin', 'alamat', 'kecamatan', 'kabupaten', 'provinsi', 'statusPermohonan', 'saldoTabungan']
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
        jenisKelamin,
        alamat,
        kecamatan,
        kabupaten,
        provinsi,
        saldoTabungan
      } = req.body;

      const put = await permohonan.update({
        id_users,
        id_mst_nasabah,
        jenisKelamin,
        alamat,
        kecamatan,
        kabupaten,
        provinsi,
        saldoTabungan
      }, {
        where: {
          id_permohonans: id
        }
      });

      res.json(put);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  approvalPermohonan: async (req, res) => {
    try {
      const id = req.params.id;
      const {
        statusPermohonan,
        hasilPermohonan,
        persentase
      } = req.body;

      const put = await permohonan.update({
        statusPermohonan,
        persentase,
        hasilPermohonan
      }, {
        where: {
          id_permohonans: id
        }
      });

      res.json(put);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deletePermohonan: async (req, res) => {
    try {
      const id = req.params.id;

      const del = await permohonan.destroy({
        where: {
          id_permohonans: id
        }
      });

      res.json({ success: del > 0 });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
