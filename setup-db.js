#!/usr/bin/env node

/**
 * Script untuk menginisialisasi database dengan admin default dan data sample
 * Jalankan: node setup-db.js
 */

const db = require('./database/init.js');
const bcrypt = require('bcryptjs');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setupDatabase() {
    console.log('\n========================================');
    console.log('Initializing Desa Way Ilahan Database');
    console.log('========================================\n');

    // Wait for database to be ready
    await sleep(2000);

    // Insert default admin
    console.log('Creating default admin account...');
    const password = 'admin123';
    const hashedPassword = bcrypt.hashSync(password, 10);

    db.run(
        `INSERT OR IGNORE INTO admin (username, password, email, nama_lengkap, jabatan)
         VALUES (?, ?, ?, ?, ?)`,
        ['admin', hashedPassword, 'admin@desawayilahan.id', 'Administrator Desa', 'Admin System'],
        (err) => {
            if (err) {
                console.error('Error creating admin:', err);
            } else {
                console.log('✓ Admin account created');
                console.log('  Username: admin');
                console.log('  Password: admin123');
            }
        }
    );

    // Insert profil desa
    console.log('\nCreating village profile...');
    db.run(
        `INSERT OR IGNORE INTO profil_desa 
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
        ],
        (err) => {
            if (err) {
                console.error('Error creating profile:', err);
            } else {
                console.log('✓ Village profile created');
            }
        }
    );

    // Insert sample data penduduk
    console.log('\nInserting sample resident data...');
    const samplePenduduk = [
        { nik: '1802001234567890', nama: 'Budi Santoso', tempat_lahir: 'Jakarta', tanggal_lahir: '1985-03-15', jenis_kelamin: 'Laki-laki', status_pernikahan: 'Kawin', alamat: 'Jl. Merdeka No. 1', rt: '01', rw: '01', dusun: 'Tengah', pekerjaan: 'Petani', pendidikan: 'SMA', agama: 'Islam' },
        { nik: '1802001234567891', nama: 'Siti Nurhayati', tempat_lahir: 'Bandung', tanggal_lahir: '1987-06-20', jenis_kelamin: 'Perempuan', status_pernikahan: 'Kawin', alamat: 'Jl. Merdeka No. 2', rt: '01', rw: '01', dusun: 'Tengah', pekerjaan: 'Ibu Rumah Tangga', pendidikan: 'SMP', agama: 'Islam' },
        { nik: '1802001234567892', nama: 'Ahmad Wijaya', tempat_lahir: 'Surabaya', tanggal_lahir: '1990-01-10', jenis_kelamin: 'Laki-laki', status_pernikahan: 'Belum Kawin', alamat: 'Jl. Sudirman No. 5', rt: '02', rw: '01', dusun: 'Utara', pekerjaan: 'Karyawan Swasta', pendidikan: 'Sarjana', agama: 'Islam' }
    ];

    samplePenduduk.forEach((p, index) => {
        db.run(
            `INSERT OR IGNORE INTO data_penduduk 
             (nik, nama, tempat_lahir, tanggal_lahir, jenis_kelamin, status_pernikahan, alamat, rt, rw, dusun, pekerjaan, pendidikan, agama)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [p.nik, p.nama, p.tempat_lahir, p.tanggal_lahir, p.jenis_kelamin, p.status_pernikahan, p.alamat, p.rt, p.rw, p.dusun, p.pekerjaan, p.pendidikan, p.agama],
            (err) => {
                if (err) console.error('Error:', err);
                else console.log(`  ✓ Resident ${index + 1}: ${p.nama}`);
            }
        );
    });

    // Insert sample wilayah
    console.log('\nInserting sample area data...');
    db.run(
        `INSERT OR IGNORE INTO wilayah (nama_dusun, jumlah_rw, jumlah_rt, jumlah_penduduk, kepala_dusun)
         VALUES (?, ?, ?, ?, ?)`,
        ['Dusun Tengah', 2, 4, 150, 'Budi Santoso'],
        (err) => {
            if (err) console.error('Error:', err);
            else console.log('  ✓ Area (Dusun Tengah) created');
        }
    );

    db.run(
        `INSERT OR IGNORE INTO wilayah (nama_dusun, jumlah_rw, jumlah_rt, jumlah_penduduk, kepala_dusun)
         VALUES (?, ?, ?, ?, ?)`,
        ['Dusun Utara', 1, 2, 75, 'Ahmad Wijaya'],
        (err) => {
            if (err) console.error('Error:', err);
            else console.log('  ✓ Area (Dusun Utara) created');
        }
    );

    // Insert sample aparatur
    console.log('\nInserting sample village officials...');
    db.run(
        `INSERT OR IGNORE INTO aparatur_desa (nama, jabatan, nik, tempat_lahir, tanggal_lahir, alamat, kontak)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ['Budi Santoso', 'Kepala Desa', '1802001234567890', 'Jakarta', '1985-03-15', 'Jl. Merdeka No. 1', '081234567890'],
        (err) => {
            if (err) console.error('Error:', err);
            else console.log('  ✓ Village Head created');
        }
    );

    db.run(
        `INSERT OR IGNORE INTO aparatur_desa (nama, jabatan, nik, tempat_lahir, tanggal_lahir, alamat, kontak)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ['Siti Nurhayati', 'Sekretaris Desa', '1802001234567891', 'Bandung', '1987-06-20', 'Jl. Merdeka No. 2', '081234567891'],
        (err) => {
            if (err) console.error('Error:', err);
            else console.log('  ✓ Village Secretary created');
        }
    );

    // Insert sample APBDes
    console.log('\nInserting sample APBDes data...');
    const tahun = new Date().getFullYear();
    const apbdesItems = [
        { tahun: tahun, item: 'Gaji Kepala Desa', jumlah: 3000000, status: 'terencana' },
        { tahun: tahun, item: 'Gaji Perangkat Desa', jumlah: 2000000, status: 'terencana' },
        { tahun: tahun, item: 'Pembangunan Jalan', jumlah: 50000000, status: 'terencana' },
        { tahun: tahun, item: 'Rehab Kantor Desa', jumlah: 25000000, status: 'dalam_proses' },
        { tahun: tahun, item: 'Program Kesehatan', jumlah: 10000000, status: 'terencana' }
    ];

    apbdesItems.forEach((item, index) => {
        db.run(
            `INSERT OR IGNORE INTO apbdes (tahun, item_pengeluaran, jumlah, status, keterangan)
             VALUES (?, ?, ?, ?, ?)`,
            [item.tahun, item.item, item.jumlah, item.status, `Item APBDes ${index + 1}`],
            (err) => {
                if (err) console.error('Error:', err);
                else console.log(`  ✓ APBDes item ${index + 1}: ${item.item}`);
            }
        );
    });

    // Insert sample berita
    console.log('\nInserting sample news...');
    db.run(
        `INSERT OR IGNORE INTO berita (judul, konten, penulis, tanggal_publish)
         VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
        ['Pembangunan Jalan Desa Dimulai', 'Pemerintah Desa Way Ilahan mulai melakukan pembangunan jalan sepanjang 5 km. Proyek ini ditargetkan selesai dalam 3 bulan ke depan.', 'Admin Desa'],
        (err) => {
            if (err) console.error('Error:', err);
            else console.log('  ✓ News 1 created');
        }
    );

    db.run(
        `INSERT OR IGNORE INTO berita (judul, konten, penulis, tanggal_publish)
         VALUES (?, ?, ?, CURRENT_TIMESTAMP)`,
        ['Program Kesehatan Gratis Untuk Masyarakat', 'Desa Way Ilahan mengadakan program kesehatan gratis setiap bulan. Masyarakat dapat melakukan pemeriksaan kesehatan dasar tanpa biaya.', 'Admin Desa'],
        (err) => {
            if (err) console.error('Error:', err);
            else console.log('  ✓ News 2 created');
        }
    );

    // Insert sample pengumuman
    console.log('\nInserting sample announcements...');
    db.run(
        `INSERT OR IGNORE INTO pengumuman (judul, konten, tanggal_publish)
         VALUES (?, ?, CURRENT_TIMESTAMP)`,
        ['Pengumuman Musyawarah Desa', 'Musyawarah Desa Way Ilahan akan diadakan pada hari Minggu, 15 Desember 2024 pukul 10.00 WIB di Kantor Desa.'],
        (err) => {
            if (err) console.error('Error:', err);
            else console.log('  ✓ Announcement 1 created');
        }
    );

    // Insert sample program kegiatan
    console.log('\nInserting sample programs...');
    db.run(
        `INSERT OR IGNORE INTO program_kegiatan (nama_program, deskripsi, tanggal_mulai, tanggal_selesai, lokasi, penanggung_jawab, status)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        ['Program Pemberdayaan Ekonomi Lokal', 'Program pelatihan usaha kecil menengah untuk masyarakat desa', new Date().toISOString().split('T')[0], '2024-12-31', 'Kantor Desa', 'Budi Santoso', 'berlangsung'],
        (err) => {
            if (err) console.error('Error:', err);
            else console.log('  ✓ Program created');
        }
    );

    console.log('\n========================================');
    console.log('✓ Database initialization completed!');
    console.log('========================================');
    console.log('\nDefault Login Credentials:');
    console.log('Username: admin');
    console.log('Password: admin123');
    console.log('\nAccess the application at: http://localhost:3000');
    console.log('Admin Panel: http://localhost:3000/admin/login\n');

    process.exit(0);
}

// Run setup
setupDatabase().catch(err => {
    console.error('Setup error:', err);
    process.exit(1);
});
