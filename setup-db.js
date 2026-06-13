#!/usr/bin/env node

/**
 * Script untuk menginisialisasi database dengan admin default dan data sample
 * Jalankan: node setup-db.js
 */

const db = require('./database/init.js');
const bcrypt = require('bcryptjs');

function runSql(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

function getSql(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}

function allSql(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
}

async function setupDatabase() {
  console.log('\n========================================');
  console.log('Initializing Desa Way Ilahan Database');
  console.log('========================================\n');

  const defaultAdmin = {
    username: 'admin',
    password: 'admin123',
    email: 'admin@desawayilahan.id',
    nama_lengkap: 'Administrator Desa',
    jabatan: 'Admin System'
  };

  try {
    const adminRow = await getSql('SELECT id FROM admin WHERE username = ?', [defaultAdmin.username]);
    if (!adminRow) {
      const hashedPassword = bcrypt.hashSync(defaultAdmin.password, 10);
      await runSql(
        `INSERT INTO admin (username, password, email, nama_lengkap, jabatan)
         VALUES (?, ?, ?, ?, ?)`,
        [defaultAdmin.username, hashedPassword, defaultAdmin.email, defaultAdmin.nama_lengkap, defaultAdmin.jabatan]
      );
      console.log('✓ Admin account created');
      console.log('  Username: admin');
      console.log('  Password: admin123');
    } else {
      console.log('✓ Admin account already exists');
    }

    const profileRow = await getSql('SELECT id FROM profil_desa WHERE id = 1');
    if (!profileRow) {
      await runSql(
        `INSERT INTO profil_desa 
         (id, nama_desa, provinsi, kabupaten, kecamatan, kode_pos, visi, misi, deskripsi)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          1,
          'Way Ilahan',
          'Lampung',
          'Tanggamus',
          'Pulau Panggung',
          '35385',
          'Mewujudkan Desa Way Ilahan yang maju, mandiri, dan sejahtera melalui pemberdayaan masyarakat.',
          'Meningkatkan pelayanan publik; Mengelola keuangan desa secara transparan; Membangun infrastruktur desa yang berkualitas; Memberdayakan ekonomi lokal.',
          'Desa Way Ilahan merupakan desa yang terletak di Kecamatan Pulau Panggung, Kabupaten Tanggamus, Provinsi Lampung. Desa ini memiliki potensi pertanian dan pariwisata yang tinggi.'
        ]
      );
      console.log('✓ Village profile created');
    } else {
      console.log('✓ Village profile already exists');
    }

    const samplePenduduk = [
      { nik: '1802001234567890', nama: 'Budi Santoso', tempat_lahir: 'Jakarta', tanggal_lahir: '1985-03-15', jenis_kelamin: 'Laki-laki', status_pernikahan: 'Kawin', alamat: 'Jl. Merdeka No. 1', rt: '01', rw: '01', dusun: 'Tengah', pekerjaan: 'Petani', pendidikan: 'SMA', agama: 'Islam' },
      { nik: '1802001234567891', nama: 'Siti Nurhayati', tempat_lahir: 'Bandung', tanggal_lahir: '1987-06-20', jenis_kelamin: 'Perempuan', status_pernikahan: 'Kawin', alamat: 'Jl. Merdeka No. 2', rt: '01', rw: '01', dusun: 'Tengah', pekerjaan: 'Ibu Rumah Tangga', pendidikan: 'SMP', agama: 'Islam' },
      { nik: '1802001234567892', nama: 'Ahmad Wijaya', tempat_lahir: 'Surabaya', tanggal_lahir: '1990-01-10', jenis_kelamin: 'Laki-laki', status_pernikahan: 'Belum Kawin', alamat: 'Jl. Sudirman No. 5', rt: '02', rw: '01', dusun: 'Utara', pekerjaan: 'Karyawan Swasta', pendidikan: 'Sarjana', agama: 'Islam' }
    ];

    for (let i = 0; i < samplePenduduk.length; i++) {
      const p = samplePenduduk[i];
      const exists = await getSql('SELECT id FROM data_penduduk WHERE nik = ?', [p.nik]);
      if (!exists) {
        await runSql(
          `INSERT INTO data_penduduk 
           (nik, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status_pernikahan, alamat, rt, rw, dusun, pekerjaan, pendidikan, agama)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [p.nik, p.nama, p.tempat_lahir, p.tanggal_lahir, p.jenis_kelamin, p.status_pernikahan, p.alamat, p.rt, p.rw, p.dusun, p.pekerjaan, p.pendidikan, p.agama]
        );
        console.log(`  ✓ Resident ${i + 1}: ${p.nama}`);
      }
    }

    const wilayahSamples = [
      ['Dusun Tengah', 2, 4, 150, 'Budi Santoso'],
      ['Dusun Utara', 1, 2, 75, 'Ahmad Wijaya']
    ];
    for (const wilayah of wilayahSamples) {
      const exists = await getSql('SELECT id FROM wilayah WHERE nama_dusun = ?', [wilayah[0]]);
      if (!exists) {
        await runSql(
          `INSERT INTO wilayah (nama_dusun, jumlah_rw, jumlah_rt, jumlah_penduduk, kepala_dusun)
           VALUES (?, ?, ?, ?, ?)`,
          wilayah
        );
        console.log(`  ✓ Area (${wilayah[0]}) created`);
      }
    }

    const aparaturSamples = [
      ['Budi Santoso', 'Kepala Desa', '1802001234567890', 'Jakarta', '1985-03-15', 'Jl. Merdeka No. 1', '081234567890'],
      ['Siti Nurhayati', 'Sekretaris Desa', '1802001234567891', 'Bandung', '1987-06-20', 'Jl. Merdeka No. 2', '081234567891']
    ];
    for (const aparatur of aparaturSamples) {
      const exists = await getSql('SELECT id FROM aparatur_desa WHERE nik = ?', [aparatur[2]]);
      if (!exists) {
        await runSql(
          `INSERT INTO aparatur_desa (nama, jabatan, nik, tempat_lahir, tanggal_lahir, alamat, kontak)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          aparatur
        );
        console.log(`  ✓ Aparatur ${aparatur[0]} created`);
      }
    }

    const tahun = new Date().getFullYear();
    const apbdesItems = [
      { tahun, item: 'Gaji Kepala Desa', jumlah: 3000000, status: 'terencana' },
      { tahun, item: 'Gaji Perangkat Desa', jumlah: 2000000, status: 'terencana' },
      { tahun, item: 'Pembangunan Jalan', jumlah: 50000000, status: 'terencana' },
      { tahun, item: 'Rehab Kantor Desa', jumlah: 25000000, status: 'dalam_proses' },
      { tahun, item: 'Program Kesehatan', jumlah: 10000000, status: 'terencana' }
    ];
    for (let i = 0; i < apbdesItems.length; i++) {
      const item = apbdesItems[i];
      const exists = await getSql('SELECT id FROM apbdes WHERE tahun = ? AND item_pengeluaran = ?', [item.tahun, item.item]);
      if (!exists) {
        await runSql(
          `INSERT INTO apbdes (tahun, item_pengeluaran, jumlah, status, keterangan)
           VALUES (?, ?, ?, ?, ?)`,
          [item.tahun, item.item, item.jumlah, item.status, `Item APBDes ${i + 1}`]
        );
        console.log(`  ✓ APBDes item ${i + 1}: ${item.item}`);
      }
    }

    const beritaSamples = [
      ['Pembangunan Jalan Desa Dimulai', 'Pemerintah Desa Way Ilahan mulai melakukan pembangunan jalan sepanjang 5 km. Proyek ini ditargetkan selesai dalam 3 bulan ke depan.', 'Admin Desa'],
      ['Program Kesehatan Gratis Untuk Masyarakat', 'Desa Way Ilahan mengadakan program kesehatan gratis setiap bulan. Masyarakat dapat melakukan pemeriksaan kesehatan dasar tanpa biaya.', 'Admin Desa']
    ];
    for (const berita of beritaSamples) {
      const exists = await getSql('SELECT id FROM berita WHERE judul = ?', [berita[0]]);
      if (!exists) {
        await runSql(
          `INSERT INTO berita (judul, konten, penulis, tanggal_publish)
           VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
          berita
        );
        console.log(`  ✓ News created: ${berita[0]}`);
      }
    }

    const pengumumanSamples = [
      ['Pengumuman Musyawarah Desa', 'Musyawarah Desa Way Ilahan akan diadakan pada hari Minggu, 15 Desember 2024 pukul 10.00 WIB di Kantor Desa.']
    ];
    for (const pengumuman of pengumumanSamples) {
      const exists = await getSql('SELECT id FROM pengumuman WHERE judul = ?', [pengumuman[0]]);
      if (!exists) {
        await runSql(
          `INSERT INTO pengumuman (judul, konten, tanggal_publish)
           VALUES (?, ?, CURRENT_TIMESTAMP)`,
          pengumuman
        );
        console.log(`  ✓ Announcement created: ${pengumuman[0]}`);
      }
    }

    const programSamples = [
      ['Program Pemberdayaan Ekonomi Lokal', 'Program pelatihan usaha kecil menengah untuk masyarakat desa', new Date().toISOString().split('T')[0], '2024-12-31', 'Kantor Desa', 'Budi Santoso', 'berlangsung']
    ];
    for (const program of programSamples) {
      const exists = await getSql('SELECT id FROM program_kegiatan WHERE nama_program = ?', [program[0]]);
      if (!exists) {
        await runSql(
          `INSERT INTO program_kegiatan (nama_program, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, penanggung_jawab, status)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          program
        );
        console.log(`  ✓ Program created: ${program[0]}`);
      }
    }

    console.log('\n========================================');
    console.log('✓ Database initialization completed!');
    console.log('========================================');
    console.log('\nDefault Login Credentials:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('\nAccess the application at: http://localhost:3000');
    console.log('Admin Panel: http://localhost:3000/admin/login\n');

    process.exit(0);
  } catch (err) {
    console.error('Setup error:', err);
    process.exit(1);
  }
}

setupDatabase();
