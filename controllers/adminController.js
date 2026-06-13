const db = require('../database/init.js');
const bcrypt = require('bcryptjs');

// Login
const getLogin = (req, res) => {
  res.render('admin/login', { title: 'Login Admin - Desa Way Ilahan' });
};

const postLogin = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username dan password harus diisi' 
    });
  }

  db.get('SELECT * FROM admin WHERE username = ?', [username], (err, admin) => {
    if (err) {
      return res.status(500).json({ 
        success: false, 
        message: 'Error saat login' 
      });
    }

    if (!admin) {
      return res.status(401).json({ 
        success: false, 
        message: 'Username atau password salah' 
      });
    }

    bcrypt.compare(password, admin.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ 
          success: false, 
          message: 'Error saat login' 
        });
      }

      if (!isMatch) {
        return res.status(401).json({ 
          success: false, 
          message: 'Username atau password salah' 
        });
      }

      req.session.admin = {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        nama_lengkap: admin.nama_lengkap,
        jabatan: admin.jabatan
      };

      res.json({ 
        success: true, 
        message: 'Login berhasil',
        redirect: '/admin/dashboard'
      });
    });
  });
};

const getLogout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).render('error', { message: 'Error saat logout' });
    }
    res.redirect('/');
  });
};

// Dashboard
const getDashboard = (req, res) => {
  db.get('SELECT COUNT(*) as total FROM data_penduduk', (err, penduduk) => {
    db.get('SELECT COUNT(*) as total FROM berita', (err, berita) => {
      db.get('SELECT COUNT(*) as total FROM pengumuman', (err, pengumuman) => {
        db.get('SELECT COUNT(*) as total FROM pengaduan WHERE status = "baru"', (err, pengaduan) => {
          db.all(
            `SELECT * FROM log_aktivitas ORDER BY created_at DESC LIMIT 10`,
            (err, logs) => {
              res.render('admin/dashboard', {
                title: 'Dashboard Admin - Desa Way Ilahan',
                admin: req.session.admin,
                stats: {
                  penduduk: penduduk ? penduduk.total : 0,
                  berita: berita ? berita.total : 0,
                  pengumuman: pengumuman ? pengumuman.total : 0,
                  pengaduan_baru: pengaduan ? pengaduan.total : 0
                },
                logs: logs || []
              });
            }
          );
        });
      });
    });
  });
};

// Kelola Data Penduduk
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
        res.render('admin/data-penduduk', {
          title: 'Kelola Data Penduduk - Desa Way Ilahan',
          admin: req.session.admin,
          penduduk: penduduk || [],
          currentPage: page,
          totalPages: totalPages,
          total: total
        });
      }
    );
  });
};

const postDataPenduduk = (req, res) => {
  const { nik, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status_pernikahan, alamat, rt, rw, dusun, pekerjaan, pendidikan, agama } = req.body;

  db.run(
    `INSERT INTO data_penduduk (nik, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status_pernikahan, alamat, rt, rw, dusun, pekerjaan, pendidikan, agama)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [nik, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status_pernikahan, alamat, rt, rw, dusun, pekerjaan, pendidikan, agama],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error menyimpan data' });
      }
      res.json({ success: true, message: 'Data penduduk berhasil ditambahkan' });
    }
  );
};

const putDataPenduduk = (req, res) => {
  const { id } = req.params;
  const { nik, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status_pernikahan, alamat, rt, rw, dusun, pekerjaan, pendidikan, agama } = req.body;

  db.run(
    `UPDATE data_penduduk SET nik=?, nama=?, tempat_lahir=?, tanggal_lahir=?, jenis_kelamin=?, status_pernikahan=?, alamat=?, rt=?, rw=?, dusun=?, pekerjaan=?, pendidikan=?, agama=?, updated_at=CURRENT_TIMESTAMP
     WHERE id = ?`,
    [nik, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status_pernikahan, alamat, rt, rw, dusun, pekerjaan, pendidikan, agama, id],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error memperbarui data' });
      }
      res.json({ success: true, message: 'Data penduduk berhasil diperbarui' });
    }
  );
};

const deleteDataPenduduk = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM data_penduduk WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error menghapus data' });
    }
    res.json({ success: true, message: 'Data penduduk berhasil dihapus' });
  });
};

// Kelola Berita
const getBerita = (req, res) => {
  db.all(
    `SELECT * FROM berita ORDER BY created_at DESC`,
    (err, berita) => {
      res.render('admin/berita', {
        title: 'Kelola Berita - Desa Way Ilahan',
        admin: req.session.admin,
        berita: berita || []
      });
    }
  );
};

const postBerita = (req, res) => {
  const { judul, konten, penulis } = req.body;
  const foto = req.file ? req.file.filename : null;

  db.run(
    `INSERT INTO berita (judul, konten, penulis, foto, tanggal_publish)
     VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
    [judul, konten, penulis, foto],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error menyimpan berita' });
      }
      res.json({ success: true, message: 'Berita berhasil ditambahkan' });
    }
  );
};

const putBerita = (req, res) => {
  const { id } = req.params;
  const { judul, konten, penulis } = req.body;
  let foto = req.body.foto_existing;

  if (req.file) {
    foto = req.file.filename;
  }

  db.run(
    `UPDATE berita SET judul=?, konten=?, penulis=?, foto=?, updated_at=CURRENT_TIMESTAMP
     WHERE id = ?`,
    [judul, konten, penulis, foto, id],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error memperbarui berita' });
      }
      res.json({ success: true, message: 'Berita berhasil diperbarui' });
    }
  );
};

const deleteBerita = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM berita WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error menghapus berita' });
    }
    res.json({ success: true, message: 'Berita berhasil dihapus' });
  });
};

// Kelola Pengumuman
const getPengumuman = (req, res) => {
  db.all(
    `SELECT * FROM pengumuman ORDER BY created_at DESC`,
    (err, pengumuman) => {
      res.render('admin/pengumuman', {
        title: 'Kelola Pengumuman - Desa Way Ilahan',
        admin: req.session.admin,
        pengumuman: pengumuman || []
      });
    }
  );
};

const postPengumuman = (req, res) => {
  const { judul, konten } = req.body;

  db.run(
    `INSERT INTO pengumuman (judul, konten, tanggal_publish)
     VALUES (?, ?, CURRENT_TIMESTAMP)`,
    [judul, konten],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error menyimpan pengumuman' });
      }
      res.json({ success: true, message: 'Pengumuman berhasil ditambahkan' });
    }
  );
};

const deletePengumuman = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM pengumuman WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error menghapus pengumuman' });
    }
    res.json({ success: true, message: 'Pengumuman berhasil dihapus' });
  });
};

// Kelola Keuangan
const getKeuangan = (req, res) => {
  const tahun = req.query.tahun || new Date().getFullYear();
  
  db.all(
    `SELECT * FROM apbdes WHERE tahun = ? ORDER BY id`,
    [tahun],
    (err, apbdes) => {
      res.render('admin/keuangan', {
        title: 'Kelola Keuangan Desa - Desa Way Ilahan',
        admin: req.session.admin,
        apbdes: apbdes || [],
        tahun: tahun
      });
    }
  );
};

const postKeuangan = (req, res) => {
  const { tahun, item_pengeluaran, jumlah, keterangan } = req.body;

  db.run(
    `INSERT INTO apbdes (tahun, item_pengeluaran, jumlah, keterangan)
     VALUES (?, ?, ?, ?)`,
    [tahun, item_pengeluaran, jumlah, keterangan],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error menyimpan data keuangan' });
      }
      res.json({ success: true, message: 'Data keuangan berhasil ditambahkan' });
    }
  );
};

const putKeuangan = (req, res) => {
  const { id } = req.params;
  const { tahun, item_pengeluaran, jumlah, keterangan, status } = req.body;

  db.run(
    `UPDATE apbdes SET tahun=?, item_pengeluaran=?, jumlah=?, keterangan=?, status=?, updated_at=CURRENT_TIMESTAMP
     WHERE id = ?`,
    [tahun, item_pengeluaran, jumlah, keterangan, status, id],
    function(err) {
      if (err) {
        return res.status(500).json({ success: false, message: 'Error memperbarui data keuangan' });
      }
      res.json({ success: true, message: 'Data keuangan berhasil diperbarui' });
    }
  );
};

const deleteKeuangan = (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM apbdes WHERE id = ?', [id], function(err) {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error menghapus data keuangan' });
    }
    res.json({ success: true, message: 'Data keuangan berhasil dihapus' });
  });
};

module.exports = {
  getLogin,
  postLogin,
  getLogout,
  getDashboard,
  getDataPenduduk,
  postDataPenduduk,
  putDataPenduduk,
  deleteDataPenduduk,
  getBerita,
  postBerita,
  putBerita,
  deleteBerita,
  getPengumuman,
  postPengumuman,
  deletePengumuman,
  getKeuangan,
  postKeuangan,
  putKeuangan,
  deleteKeuangan
};
