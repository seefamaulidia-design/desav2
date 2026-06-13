# Sistem Data Desa Way Ilahan

Website transparansi data dan keuangan desa berbasis web dengan hak akses administrator.

## 🎯 Tentang Sistem

Sistem Data Desa Way Ilahan adalah aplikasi web yang dirancang untuk:
- **Transparansi Data**: Menampilkan data desa secara terbuka kepada masyarakat
- **Manajemen Keuangan**: Mengelola dan menampilkan APBDes (Anggaran Pendapatan Belanja Desa) secara transparan
- **Hak Akses**: Admin dapat mengelola data, masyarakat hanya dapat melihat informasi yang dipublikasikan
- **Informasi Desa**: Menampilkan profil, aparatur, berita, dan pengumuman desa

## 📍 Lokasi Desa

- **Nama Desa**: Desa Way Ilahan
- **Kecamatan**: Pulau Panggung
- **Kabupaten**: Tanggamus
- **Provinsi**: Lampung

## ✨ Fitur Utama

### Untuk Masyarakat Umum (Publik)

1. **Beranda** - Halaman utama dengan berita terbaru dan akses cepat
2. **Profil Desa** - Informasi umum, visi, misi desa
3. **Data Penduduk** - Daftar penduduk terdata (paginasi)
4. **Data Dusun/RW/RT** - Struktur administratif desa
5. **Aparatur Desa** - Profil perangkat dan aparatur desa
6. **APBDes** - Anggaran Pendapatan Belanja Desa per tahun
7. **Realisasi Anggaran** - Progress pencapaian anggaran
8. **Program dan Kegiatan** - Program pembangunan desa
9. **Berita Desa** - Berita dan informasi terbaru
10. **Pengumuman** - Pengumuman resmi desa
11. **Galeri Foto** - Dokumentasi kegiatan desa
12. **Dokumen Publik** - File dan dokumen untuk diunduh
13. **Kontak & Pengaduan** - Form untuk pengaduan dan masukan

### Untuk Admin

1. **Login Admin** - Autentikasi admin dengan username dan password
2. **Dashboard** - Dashboard dengan statistik dan aktivitas
3. **Kelola Data Penduduk** - CRUD data penduduk
4. **Kelola Keuangan Desa** - Manajemen APBDes
5. **Kelola Berita** - Tulis, edit, hapus berita
6. **Kelola Pengumuman** - Manajemen pengumuman
7. **Kelola Aparatur Desa** - Data perangkat desa
8. **Kelola Dokumen** - Upload dokumen publik
9. **Kelola Galeri** - Upload dan kelola foto
10. **Log Aktivitas** - Pencatatan semua aktivitas admin

## 🔒 Hak Akses

### Admin
- ✅ Tambah, ubah, hapus seluruh data
- ✅ Kelola keuangan desa
- ✅ Publikasi berita dan pengumuman
- ✅ Lihat log aktivitas
- ✅ Kelola pengguna admin

### Masyarakat/Publik
- ✅ Lihat semua informasi publik
- ✅ Unduh dokumen
- ✅ Kirim pengaduan/saran
- ❌ Tidak bisa mengubah data

## 🚀 Instalasi dan Setup

### Prasyarat
- Node.js v14 atau lebih tinggi
- npm atau yarn
- Git (opsional)

### Langkah Instalasi

1. **Clone atau download repository**
   ```bash
   cd desav2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup database dan data sample**
   ```bash
   node setup-db.js
   ```

4. **Jalankan aplikasi**
   ```bash
   npm start
   ```
   
   Atau untuk development dengan auto-reload:
   ```bash
   npm run dev
   ```

5. **Akses aplikasi**
   - Website publik: `http://localhost:3000`
   - Admin login: `http://localhost:3000/admin/login`

## 🔐 Kredensial Default

**Admin Default:**
- Username: `admin`
- Password: `admin123`

⚠️ **Penting**: Ubah password admin setelah login pertama kali!

## 📁 Struktur Direktori

```
desav2/
├── app.js                 # Entry point aplikasi
├── package.json          # Konfigurasi npm
├── setup-db.js           # Script setup database
├── .env                  # Environment variables
│
├── config/               # Konfigurasi aplikasi
├── database/
│   └── init.js          # Inisialisasi database SQLite
│
├── middleware/
│   └── auth.js          # Middleware autentikasi
│
├── models/              # Model data (untuk future use)
├── controllers/
│   ├── publicController.js   # Controller halaman publik
│   └── adminController.js    # Controller admin
│
├── routes/
│   ├── public.js        # Route publik
│   └── admin.js         # Route admin
│
├── views/               # Template EJS
│   ├── layout.ejs       # Layout utama
│   ├── index.ejs        # Halaman beranda
│   ├── error.ejs        # Halaman error
│   ├── public/          # Views publik
│   │   ├── profil-desa.ejs
│   │   ├── data-penduduk.ejs
│   │   ├── wilayah.ejs
│   │   ├── aparatur.ejs
│   │   ├── apbdes.ejs
│   │   ├── realisasi-anggaran.ejs
│   │   ├── program-kegiatan.ejs
│   │   ├── berita.ejs
│   │   ├── berita-detail.ejs
│   │   ├── pengumuman.ejs
│   │   ├── galeri.ejs
│   │   ├── dokumen.ejs
│   │   └── pengaduan.ejs
│   └── admin/           # Views admin
│       ├── login.ejs
│       ├── dashboard.ejs
│       ├── data-penduduk.ejs
│       ├── keuangan.ejs
│       ├── berita.ejs
│       └── pengumuman.ejs
│
├── public/
│   ├── css/
│   │   └── style.css    # Stylesheet utama
│   ├── js/
│   │   └── main.js      # JavaScript utilities
│   ├── images/          # Folder untuk gambar
│   └── uploads/         # Folder untuk file upload
│
└── README.md            # File ini
```

## 💾 Database

Aplikasi menggunakan **SQLite** untuk database. File database disimpan di:
```
database/desa_way_ilahan.db
```

### Tabel Database
1. `admin` - Data admin/user
2. `profil_desa` - Profil desa
3. `data_penduduk` - Data penduduk
4. `wilayah` - Data dusun/RW/RT
5. `aparatur_desa` - Data aparatur desa
6. `apbdes` - Data keuangan desa
7. `realisasi_anggaran` - Realisasi anggaran
8. `program_kegiatan` - Program dan kegiatan
9. `berita` - Berita desa
10. `pengumuman` - Pengumuman
11. `galeri` - Galeri foto
12. `dokumen` - Dokumen publik
13. `pengaduan` - Pengaduan/saran
14. `log_aktivitas` - Log aktivitas admin

## 🛠️ Teknologi yang Digunakan

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Web framework
- **SQLite3** - Database
- **EJS** - Template engine
- **bcryptjs** - Password hashing
- **express-session** - Session management
- **multer** - File upload
- **cors** - Cross-origin resource sharing

### Frontend
- **HTML5** - Markup
- **CSS3** - Styling
- **JavaScript (Vanilla)** - Interaktivitas
- **Font Awesome** - Icon library

## 📖 Penggunaan

### Untuk Masyarakat
1. Buka website: `http://localhost:3000`
2. Navigasi ke halaman yang ingin dilihat
3. Lihat informasi transparansi data dan keuangan
4. Unduh dokumen jika diperlukan
5. Kirim pengaduan/saran melalui form kontak

### Untuk Admin
1. Buka: `http://localhost:3000/admin/login`
2. Login dengan username dan password
3. Kelola data dari dashboard
4. Publikasikan berita dan pengumuman
5. Lihat log aktivitas

## 🔧 Konfigurasi

Edit file `.env` untuk konfigurasi:
```
PORT=3000                              # Port aplikasi
NODE_ENV=development                   # Environment
SESSION_SECRET=your-secret-key         # Secret untuk session
DB_PATH=./database/desa_way_ilahan.db # Path database
```

## 📝 Catatan Penting

1. **Backup Database**: Secara berkala backup file database
2. **Password Admin**: Ubah password default segera setelah setup
3. **Upload File**: Pastikan folder `public/uploads` memiliki write permission
4. **Security**: Untuk production, aktifkan HTTPS dan ubah SESSION_SECRET
5. **Maintenance**: Backup data secara berkala

## 🐛 Troubleshooting

### Port sudah digunakan
```bash
# Ubah port di .env atau jalankan di port lain
PORT=3001 npm start
```

### Database error
```bash
# Reset database
rm database/desa_way_ilahan.db
node setup-db.js
```

### Module tidak ditemukan
```bash
# Install ulang dependencies
rm -rf node_modules
npm install
```

## 🚀 Deployment

### Heroku
1. Instal Heroku CLI
2. Login: `heroku login`
3. Create app: `heroku create app-name`
4. Deploy: `git push heroku main`

### VPS/Server
1. Upload file ke server
2. Install Node.js
3. Run: `npm install`
4. Setup PM2: `npm install -g pm2`
5. Start: `pm2 start app.js`
6. Configure reverse proxy (Nginx/Apache)

## 📞 Dukungan

Untuk pertanyaan atau masalah, hubungi:
- Email: admin@desawayilahan.id
- Telepon: (0726) XXXXXXX
- Kantor Desa Way Ilahan

## 📄 Lisensi

MIT License - Bebas digunakan untuk keperluan desa

## ✅ Daftar Fitur Implementasi

- [x] Halaman publik (beranda, profil, data penduduk, dll)
- [x] Login admin
- [x] Dashboard admin
- [x] CRUD data penduduk
- [x] CRUD berita dan pengumuman
- [x] Manajemen APBDes
- [x] Halaman galeri
- [x] Form pengaduan
- [x] Log aktivitas admin
- [x] Responsive design (mobile-friendly)
- [x] Database SQLite
- [x] Autentikasi session
- [x] Upload file
- [x] Pagination

## 🎨 Customization

### Ubah Logo/Brand
Edit `views/layout.ejs` - ubah bagian `.navbar-brand`

### Ubah Warna Tema
Edit `public/css/style.css` - ubah CSS custom properties di `:root`

### Ubah Informasi Desa
Edit data di admin panel atau ubah di `setup-db.js`

---

**Versi**: 1.0.0  
**Updated**: 2024  
**Dikembangkan untuk Desa Way Ilahan, Tanggamus, Lampung**
