const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, '../database/desa_way_ilahan.db');

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database at', DB_PATH);
    initializeDatabase();
  }
});

function initializeDatabase() {
  db.serialize(() => {
    // Tabel Admin/Users
    db.run(`
      CREATE TABLE IF NOT EXISTS admin (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        nama_lengkap TEXT NOT NULL,
        jabatan TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel Profil Desa
    db.run(`
      CREATE TABLE IF NOT EXISTS profil_desa (
        id INTEGER PRIMARY KEY,
        nama_desa TEXT NOT NULL,
        provinsi TEXT NOT NULL,
        kabupaten TEXT NOT NULL,
        kecamatan TEXT NOT NULL,
        kode_pos TEXT,
        visi TEXT,
        misi TEXT,
        deskripsi TEXT,
        foto_desa TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel Data Penduduk
    db.run(`
      CREATE TABLE IF NOT EXISTS data_penduduk (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nik TEXT UNIQUE NOT NULL,
        nama TEXT NOT NULL,
        tempat_lahir TEXT,
        tanggal_lahir DATE,
        jenis_kelamin TEXT,
        status_pernikahan TEXT,
        alamat TEXT,
        rt TEXT,
        rw TEXT,
        dusun TEXT,
        pekerjaan TEXT,
        pendidikan TEXT,
        agama TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel Dusun/RW/RT
    db.run(`
      CREATE TABLE IF NOT EXISTS wilayah (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama_dusun TEXT NOT NULL,
        jumlah_rw INTEGER,
        jumlah_rt INTEGER,
        jumlah_penduduk INTEGER DEFAULT 0,
        kepala_dusun TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel Aparatur Desa
    db.run(`
      CREATE TABLE IF NOT EXISTS aparatur_desa (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT NOT NULL,
        jabatan TEXT NOT NULL,
        nik TEXT UNIQUE NOT NULL,
        tempat_lahir TEXT,
        tanggal_lahir DATE,
        alamat TEXT,
        kontak TEXT,
        foto TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel APBDes (Keuangan Desa)
    db.run(`
      CREATE TABLE IF NOT EXISTS apbdes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tahun INTEGER NOT NULL,
        item_pengeluaran TEXT NOT NULL,
        jumlah REAL NOT NULL,
        keterangan TEXT,
        status TEXT DEFAULT 'terencana',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel Realisasi Anggaran
    db.run(`
      CREATE TABLE IF NOT EXISTS realisasi_anggaran (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        tahun INTEGER NOT NULL,
        item_pengeluaran TEXT NOT NULL,
        anggaran REAL NOT NULL,
        realisasi REAL NOT NULL,
        persentase REAL,
        keterangan TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel Program dan Kegiatan
    db.run(`
      CREATE TABLE IF NOT EXISTS program_kegiatan (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama_program TEXT NOT NULL,
        deskripsi TEXT,
        tanggal_mulai DATE,
        tanggal_selesai DATE,
        lokasi TEXT,
        penanggung_jawab TEXT,
        status TEXT DEFAULT 'berlangsung',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel Berita Desa
    db.run(`
      CREATE TABLE IF NOT EXISTS berita (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        judul TEXT NOT NULL,
        konten TEXT NOT NULL,
        penulis TEXT,
        foto TEXT,
        tanggal_publish DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel Pengumuman
    db.run(`
      CREATE TABLE IF NOT EXISTS pengumuman (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        judul TEXT NOT NULL,
        konten TEXT NOT NULL,
        tanggal_publish DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel Galeri Foto
    db.run(`
      CREATE TABLE IF NOT EXISTS galeri (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        judul TEXT NOT NULL,
        deskripsi TEXT,
        foto TEXT NOT NULL,
        tanggal_upload DATETIME,
        kategori TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel Dokumen Publik
    db.run(`
      CREATE TABLE IF NOT EXISTS dokumen (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        judul TEXT NOT NULL,
        deskripsi TEXT,
        file_path TEXT NOT NULL,
        kategori TEXT,
        tanggal_upload DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel Pengaduan/Kontak
    db.run(`
      CREATE TABLE IF NOT EXISTS pengaduan (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nama TEXT NOT NULL,
        email TEXT NOT NULL,
        telepon TEXT,
        judul TEXT NOT NULL,
        isi TEXT NOT NULL,
        status TEXT DEFAULT 'baru',
        balasan TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Tabel Log Aktivitas
    db.run(`
      CREATE TABLE IF NOT EXISTS log_aktivitas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        admin_id INTEGER,
        aksi TEXT NOT NULL,
        tabel TEXT,
        keterangan TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (admin_id) REFERENCES admin(id)
      )
    `);

    console.log('Database tables initialized successfully');
  });
}

module.exports = db;
