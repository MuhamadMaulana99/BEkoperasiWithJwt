const { models: { angsuran, loginModel, masterNasabah } } = require('../../model/index.js');

module.exports = {

        addAngsuran: async (req, res) => {
            try {
                const { id_users, id_mst_nasabah, nomorAkad, staffBasil, staffPokok, accBasil, accPokok, staffBy, staffAt, kasirBy, kasirAtt, lokasiPembayaran } = req.body;
                
                // Validasi field yang diperlukan
                if (!id_users || !id_mst_nasabah) {
                    return res.status(400).json({ error: "id_users dan id_mst_nasabah diperlukan." });
                }
    
                // Periksa apakah id_users ada
                const userExists = await loginModel.findByPk(id_users);
                // console.log(loginModel, '--------------------------------------')
                if (!userExists) {
                    return res.status(404).json({ error: "Pengguna tidak ditemukan." });
                }
    
                // Periksa apakah id_mst_nasabah ada (jika diperlukan)
                const nasabahExists = await masterNasabah.findByPk(id_mst_nasabah);
                if (!nasabahExists) {
                    return res.status(404).json({ error: "Nasabah tidak ditemukan." });
                }
    
                const add = await angsuran.create({ 
                    id_users, 
                    id_mst_nasabah,  
                    nomorAkad, 
                    staffBasil, 
                    staffPokok, 
                    accBasil, 
                    accPokok, 
                    staffBy, 
                    staffAt, 
                    kasirBy, 
                    kasirAtt, 
                    lokasiPembayaran 
                });
                res.json(add);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        },

    getAngsuran: async (req, res) => {
        try {
            const { id_users } = req.params; 
            // console.log(id_users, 'iddd')

            

            // If id_user is provided, filter by it
            const queryOptions = {
                attributes: ['id_angsurans', 'id_user', 'nomorAkad', 'staffBasil', 'staffPokok', 'accBasil', 'accPokok', 'staffBy', 'staffAt', 'kasirBy', 'kasirAtt', 'lokasiPembayaran']
            };

            if (id_users) {
                queryOptions.where = { id_users }; // Add the condition to filter by id_user
            }

            const get = await angsuran.findAll({
                include: [
                    {
                        model: loginModel,
                        as: 'user',
                        attributes: ['id_users', 'username'], // Ambil atribut yang diperlukan
                    },
                    {
                        model: masterNasabah,
                        as: 'nasabah',
                        attributes: ['id_mst_nasabah', 'nama', 'mstNik', 'mstRekening', 'mstjenisKelamin', 'mstAlamat', 'mstKecamatan', 'mstKabupaten', 'mstProvinsi'], // Ambil atribut yang diperlukan
                    },
                ],
                attributes: ['id_angsurans', 'nomorAkad', 'staffBasil', 'staffPokok', 'accBasil', 'accPokok', 'staffBy', 'staffAt', 'kasirBy', 'kasirAtt', 'lokasiPembayaran'],
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

    putAngsuran: async (req, res) => {
        try {
            const id = req.params.id;
            const { id_user, nomorAkad, staffBasil, staffPokok, accBasil, accPokok, staffBy, staffAt, kasirBy, kasirAtt, lokasiPembayaran } = req.body;
            const [updated] = await angsuran.update({ id_user, nomorAkad, staffBasil, staffPokok, accBasil, accPokok, staffBy, staffAt, kasirBy, kasirAtt, lokasiPembayaran }, {
                where: { id_angsurans: id }
            });
            if (updated) {
                const updatedAngsuran = await angsuran.findByPk(id);
                res.json(updatedAngsuran);
            } else {
                res.status(404).json({ message: 'Angsuran not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteAngsuran: async (req, res) => {
        try {
            const id = req.params.id;
            const deleted = await angsuran.destroy({
                where: { id_angsurans: id }
            });
            if (deleted) {
                res.json({ message: 'Angsuran deleted successfully' });
            } else {
                res.status(404).json({ message: 'Angsuran not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};
