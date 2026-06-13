const express = require('express');
const router = express.Router();
const publicController = require('../controllers/publicController');

// Public Routes
router.get('/', publicController.getHome);
router.get('/profil-desa', publicController.getProfilDesa);
router.get('/data-penduduk', publicController.getDataPenduduk);
router.get('/wilayah', publicController.getWilayah);
router.get('/aparatur', publicController.getAparatur);
router.get('/apbdes', publicController.getAPBDes);
router.get('/realisasi-anggaran', publicController.getRealisasiAnggaran);
router.get('/program-kegiatan', publicController.getProgramKegiatan);
router.get('/berita', publicController.getBerita);
router.get('/berita/:id', publicController.getBeritaDetail);
router.get('/pengumuman', publicController.getPengumuman);
router.get('/galeri', publicController.getGaleri);
router.get('/dokumen', publicController.getDokumen);
router.get('/pengaduan', publicController.getPengaduan);
router.post('/pengaduan', publicController.postPengaduan);

module.exports = router;
