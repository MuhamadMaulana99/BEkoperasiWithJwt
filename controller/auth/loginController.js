const { models: { loginModel } } = require('../../model/index.js');

module.exports = {
  addUser: async (req, res) => {
    const { username, password, userRoles } = req.body;

    try {
      // Cek apakah username sudah ada di database
      const existingUser = await loginModel.findOne({ where: { username } });

      if (existingUser) {
        // Jika username sudah ada, kembalikan status 400 dengan pesan error
        return res.status(400).json({
          message: 'Username sudah digunakan, silakan pilih username yang lain.'
        });
      }

      // Jika username tidak ada, buat pengguna baru
      const newUser = await loginModel.create({ username, password, userRoles });

      // Mengembalikan data pengguna baru yang telah dibuat
      return res.status(201).json({
        message: 'Pengguna berhasil ditambahkan.',
        data: newUser
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
        errorMessage: error.message
      });
    }
  },
  LoginUser: async (req, res) => {
    const { username, password, userRoles } = req.body
    const user = await loginModel.findOne({ where: { username: username, password: password } })
    try {
      // console.log(res, 'ress')
      if (!user) {
        return res.status(401).json({
          message: 'username atau password salah',
          errorMesagge: `pasword ${password} salahh woii`
        })
      } else {
        return res.status(200).json({ message: 'Login Berhasil', response: { id: user?.id_users, name: user?.username, userRoles: user?.userRoles } })
      }
    } catch (error) {
      console.error(error);
      if (error instanceof Sequelize.ValidationError) {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
      } else if (error instanceof Sequelize.UniqueConstraintError) {
        return res.status(409).json({ message: 'Duplicate entry', errors: error.errors });
      } else {
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }

  },
  getUser: async (req, res) => {
    const get = await loginModel.findAll({
      attributes: ['id_users', 'username', 'password', 'userRoles']
    })
    const val = get?.map((value) => {
      return {
        ...value.dataValues,
        userRoles: JSON.parse(value?.userRoles)
      }
    })
    res.json(val)
  },

  getUserByRole: async (req, res) => {
    const get = await loginModel.findAll({
      where: { userRoles: `{"roleUser":"Admin","id":2}` },
      attributes: ['id_users', 'username', 'password', 'userRoles']
    })
    // console.log(get, 'gett')
    const val = get?.map((value) => {
      return {
        ...value.dataValues,
        userRoles: JSON.parse(value?.userRoles)
      }
    })
    res.json(val)
  },

  putUser: async (req, res) => {
    const id = req.params.id; // Mengambil ID dari parameter URL
    const { username, password, userRoles } = req.body; // Mengambil data dari request body

    try {
      // Memperbarui data pengguna
      const [updated] = await loginModel.update({ username, password, userRoles }, {
        where: {
          id_users: id, // Menggunakan kolom yang benar (id_users)
        }
      });

      // Memeriksa apakah ada data yang diperbarui
      if (updated === 0) {
        return res.status(404).json({
          message: 'Pengguna tidak ditemukan atau tidak ada perubahan yang dilakukan.'
        });
      } else {
        return res.status(200).json({
          message: `Pengguna dengan ID ${id} telah diperbarui.`,
          updatedData: { username, userRoles } // Menyertakan data yang diperbarui dalam respons
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
        errorMessage: error.message // Mengembalikan pesan error yang lebih informatif
      });
    }
  },
  deleteUser: async (req, res) => {
    const id = req.params.id; // Mengambil ID dari parameter URL
    try {
      const del = await loginModel.destroy({
        where: {
          id_users: id, // Pastikan menggunakan kolom yang benar (id_users)
        }
      });

      // Memeriksa apakah ada data yang dihapus
      if (del === 0) { // Jika tidak ada yang dihapus
        return res.status(404).json({
          message: 'Pengguna tidak ditemukan atau sudah dihapus.'
        });
      } else {
        return res.status(200).json({
          message: `Pengguna dengan ID ${id} telah dihapus.`
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: 'Internal Server Error',
        errorMessage: error.message // Mengembalikan pesan error yang lebih informatif
      });
    }
  }
}