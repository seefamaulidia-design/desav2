const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { checkAuth } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Konfigurasi multer untuk upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Admin Routes - Login
router.get('/login', adminController.getLogin);
router.post('/login', adminController.postLogin);
router.get('/logout', adminController.getLogout);

// Admin Routes - Protected
router.get('/dashboard', checkAuth, adminController.getDashboard);

// Data Penduduk
router.get('/data-penduduk', checkAuth, adminController.getDataPenduduk);
router.post('/data-penduduk', checkAuth, adminController.postDataPenduduk);
router.put('/data-penduduk/:id', checkAuth, adminController.putDataPenduduk);
router.delete('/data-penduduk/:id', checkAuth, adminController.deleteDataPenduduk);

// Berita
router.get('/berita', checkAuth, adminController.getBerita);
router.post('/berita', checkAuth, upload.single('foto'), adminController.postBerita);
router.put('/berita/:id', checkAuth, upload.single('foto'), adminController.putBerita);
router.delete('/berita/:id', checkAuth, adminController.deleteBerita);

// Pengumuman
router.get('/pengumuman', checkAuth, adminController.getPengumuman);
router.post('/pengumuman', checkAuth, adminController.postPengumuman);
router.delete('/pengumuman/:id', checkAuth, adminController.deletePengumuman);

// Aparatur Desa
router.get('/aparatur', checkAuth, adminController.getAparaturAdmin);
router.post('/aparatur', checkAuth, adminController.postAparatur);
router.post('/aparatur/:id/edit', checkAuth, adminController.postEditAparatur);
router.post('/aparatur/:id/delete', checkAuth, adminController.deleteAparatur);

// Keuangan
router.get('/keuangan', checkAuth, adminController.getKeuangan);
router.post('/keuangan', checkAuth, adminController.postKeuangan);
router.put('/keuangan/:id', checkAuth, adminController.putKeuangan);
router.delete('/keuangan/:id', checkAuth, adminController.deleteKeuangan);

module.exports = router;
