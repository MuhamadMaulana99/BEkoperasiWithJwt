const express = require("express");
const loginController = require("../controller/auth/loginController.js");
const pengajuanController = require("../controller/koperasi/pengajuanController.js");
const permohonanController = require("../controller/koperasi/permohonanController.js");
const angsuranController = require("../controller/koperasi/angsuranController.js");
const masterAnalisaController = require("../controller/master/analisaController.js");
const masterNasabahController = require("../controller/master/nasabahController.js");
const authMiddleware = require("../controller/config/authMiddleware.js"); 

const routers = express.Router();

// 🟢 Tanpa Auth (Public Routes)
routers.post("/login", loginController.LoginUser);
routers.post("/register", loginController.addUser);

// 🔴 Dengan Auth (Protected Routes)
routers.get("/allUser", authMiddleware, loginController.getUser);
routers.get("/allUserByRoles", authMiddleware, loginController.getUserByRole);
routers.delete("/allUser/:id", authMiddleware, loginController.deleteUser);
routers.put("/allUser/:id", authMiddleware, loginController.putUser);

routers.get("/angsuran", authMiddleware, angsuranController.getAngsuran);
routers.post("/angsuran", authMiddleware, angsuranController.addAngsuran);
routers.delete("/angsuran/:id", authMiddleware, angsuranController.deleteAngsuran);
routers.put("/angsuran/:id", authMiddleware, angsuranController.putAngsuran);

routers.get("/permohonan", authMiddleware, permohonanController.getPermohonan);
routers.get("/permohonanByApprove", authMiddleware, permohonanController.getPermohonanByApprove);
routers.post("/permohonan", authMiddleware, permohonanController.addPermohonan);
routers.delete("/permohonan/:id", authMiddleware, permohonanController.deletePermohonan);
routers.put("/permohonan/:id", authMiddleware, permohonanController.putPermohonan);
routers.put("/approvalPermohonan/:id", authMiddleware, permohonanController.approvalPermohonan);

routers.get("/pengajuan", authMiddleware, pengajuanController.getPengajuan);
routers.get("/approvelPengajuan", authMiddleware, pengajuanController.getApprovelPengajuan);
routers.get("/pengajuanByNoAkad", authMiddleware, pengajuanController.getPengajuanByNoAkad);
routers.post("/pengajuan", authMiddleware, pengajuanController.addPengajuan);
routers.delete("/pengajuan/:id", authMiddleware, pengajuanController.deletePengajuan);
routers.put("/pengajuanByApprove/:id", authMiddleware, pengajuanController.approvalPengajuan);
routers.put("/pengajuan/:id", authMiddleware, pengajuanController.putPengajuan);

routers.get("/masterAnalisa", authMiddleware, masterAnalisaController.getAnalisa);
routers.post("/masterAnalisa", authMiddleware, masterAnalisaController.addAnalisa);
routers.delete("/masterAnalisa/:id", authMiddleware, masterAnalisaController.deleteAnalisa);
routers.put("/masterAnalisa/:id", authMiddleware, masterAnalisaController.putAnalisa);

routers.get("/masterNasabah", authMiddleware, masterNasabahController.getNasabah);
routers.get("/masterNasabah/:id", authMiddleware, masterNasabahController.getNasabahId);
routers.get("/masterNasabahByRekening/:mstRekening", authMiddleware, masterNasabahController.getNasabahRekening);
routers.post("/masterNasabah", authMiddleware, masterNasabahController.addNasabah);
routers.delete("/masterNasabah/:id", authMiddleware, masterNasabahController.deleteNasabah);
routers.put("/masterNasabah/:id", authMiddleware, masterNasabahController.putNasabah);

module.exports = routers;
