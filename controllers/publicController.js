const db = require('../database/init.js');
const bcrypt = require('bcryptjs');

// Controller untuk halaman publik
const getHome = (req, res) => {
  db.get('SELECT * FROM profil_desa LIMIT 1', (err, profil) => {
    if (err) {
      return res.status(500).render('error', { message: 'Error loading profile' });
    }
    
    db.all(
      `SELECT * FROM berita ORDER BY created_at DESC LIMIT 5`,
      (err, berita) => {
        res.render('index', {
          title: 'Beranda - Desa Way Ilahan',
          profil: profil,
          berita: berita
        });
      }
    );
  });
};

const getProfilDesa = (req, res) => {
  db.get('SELECT * FROM profil_desa LIMIT 1', (err, profil) => {
    if (err) {
      return res.status(500).render('error', { message: 'Error loading profile' });
    }
    res.render('public/profil-desa', {
      title: 'Profil Desa - Desa Way Ilahan',
      profil: profil
    });
  });
};

const getDataPenduduk = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  db.get('SELECT COUNT(*) as total FROM data_penduduk', (err, countResult) => {
    const total = countResult.total;
    const totalPages = Math.ceil(total / limit);

    db.all(
      `SELECT * FROM data_penduduk LIMIT ? OFFSET ?`,
      [limit, offset],
      (err, penduduk) => {
        res.render('public/data-penduduk', {
          title: 'Data Penduduk - Desa Way Ilahan',
          penduduk: penduduk,
          currentPage: page,
          totalPages: totalPages,
          total: total
        });
      }
    );
  });
};

const getWilayah = (req, res) => {
  db.all('SELECT * FROM wilayah', (err, wilayah) => {
    if (err) {
      return res.status(500).render('error', { message: 'Error loading data' });
    }
    res.render('public/wilayah', {
      title: 'Data Dusun/RW/RT - Desa Way Ilahan',
      wilayah: wilayah
    });
  });
};

const getAparatur = (req, res) => {
  db.all('SELECT * FROM aparatur_desa ORDER BY jabatan', (err, aparatur) => {
    if (err) {
      return res.status(500).render('error', { message: 'Error loading data' });
    }
    res.render('public/aparatur', {
      title: 'Aparatur Desa - Desa Way Ilahan',
      aparatur: aparatur
    });
  });
};

const getAPBDes = (req, res) => {
  const tahun = req.query.tahun || new Date().getFullYear();
  
  db.all(
    `SELECT * FROM apbdes WHERE tahun = ? ORDER BY id`,
    [tahun],
    (err, apbdes) => {
      if (err) {
        return res.status(500).render('error', { message: 'Error loading data' });
      }
      
      let total = 0;
      apbdes.forEach(item => {
        total += item.jumlah;
      });

      res.render('public/apbdes', {
        title: 'APBDes - Desa Way Ilahan',
        apbdes: apbdes,
        tahun: tahun,
        total: total
      });
    }
  );
};

const getRealisasiAnggaran = (req, res) => {
  const tahun = req.query.tahun || new Date().getFullYear();
  
  db.all(
    `SELECT * FROM realisasi_anggaran WHERE tahun = ?`,
    [tahun],
    (err, realisasi) => {
      if (err) {
        return res.status(500).render('error', { message: 'Error loading data' });
      }
      res.render('public/realisasi-anggaran', {
        title: 'Realisasi Anggaran - Desa Way Ilahan',
        realisasi: realisasi,
        tahun: tahun
      });
    }
  );
};

const getProgramKegiatan = (req, res) => {
  db.all(
    `SELECT * FROM program_kegiatan ORDER BY tanggal_mulai DESC`,
    (err, program) => {
      if (err) {
        return res.status(500).render('error', { message: 'Error loading data' });
      }
      res.render('public/program-kegiatan', {
        title: 'Program dan Kegiatan - Desa Way Ilahan',
        program: program
      });
    }
  );
};

const getBerita = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 10;
  const offset = (page - 1) * limit;

  db.get('SELECT COUNT(*) as total FROM berita', (err, countResult) => {
    const total = countResult.total;
    const totalPages = Math.ceil(total / limit);

    db.all(
      `SELECT * FROM berita ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [limit, offset],
      (err, berita) => {
        res.render('public/berita', {
          title: 'Berita Desa - Desa Way Ilahan',
          berita: berita,
          currentPage: page,
          totalPages: totalPages
        });
      }
    );
  });
};

const getBeritaDetail = (req, res) => {
  const id = req.params.id;
  
  db.get('SELECT * FROM berita WHERE id = ?', [id], (err, berita) => {
    if (err || !berita) {
      return res.status(404).render('error', { message: 'Berita tidak ditemukan' });
    }
    res.render('public/berita-detail', {
      title: berita.judul + ' - Desa Way Ilahan',
      berita: berita
    });
  });
};

const getPengumuman = (req, res) => {
  db.all(
    `SELECT * FROM pengumuman ORDER BY created_at DESC`,
    (err, pengumuman) => {
      if (err) {
        return res.status(500).render('error', { message: 'Error loading data' });
      }
      res.render('public/pengumuman', {
        title: 'Pengumuman - Desa Way Ilahan',
        pengumuman: pengumuman
      });
    }
  );
};

const getGaleri = (req, res) => {
  db.all(
    `SELECT * FROM galeri ORDER BY created_at DESC`,
    (err, galeri) => {
      if (err) {
        return res.status(500).render('error', { message: 'Error loading data' });
      }
      res.render('public/galeri', {
        title: 'Galeri Foto - Desa Way Ilahan',
        galeri: galeri
      });
    }
  );
};

const getDokumen = (req, res) => {
  db.all(
    `SELECT * FROM dokumen ORDER BY created_at DESC`,
    (err, dokumen) => {
      if (err) {
        return res.status(500).render('error', { message: 'Error loading data' });
      }
      res.render('public/dokumen', {
        title: 'Dokumen Publik - Desa Way Ilahan',
        dokumen: dokumen
      });
    }
  );
};

const getPengaduan = (req, res) => {
  res.render('public/pengaduan', {
    title: 'Kontak dan Pengaduan - Desa Way Ilahan'
  });
};

const postPengaduan = (req, res) => {
  const { nama, email, telepon, judul, isi } = req.body;

  if (!nama || !email || !judul || !isi) {
    return res.status(400).json({ success: false, message: 'Semua field harus diisi' });
  }

  db.run(
    `INSERT INTO pengaduan (nama, email, telepon, judul, isi, status) 
     VALUES (?, ?, ?, ?, ?, 'baru')`,
    [nama, email, telepon, judul, isi],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error menyimpan pengaduan' });
      }
      res.json({ 
        success: true, 
        message: 'Pengaduan kami terima dengan baik. Terima kasih atas masukan Anda.' 
      });
    }
  );
};

module.exports = {
  getHome,
  getProfilDesa,
  getDataPenduduk,
  getWilayah,
  getAparatur,
  getAPBDes,
  getRealisasiAnggaran,
  getProgramKegiatan,
  getBerita,
  getBeritaDetail,
  getPengumuman,
  getGaleri,
  getDokumen,
  getPengaduan,
  postPengaduan
};
