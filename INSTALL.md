# 📋 Panduan Instalasi Sistem Data Desa Way Ilahan

## ⚡ Instalasi Cepat (Quick Start)

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Database
```bash
node setup-db.js
```

### 3. Jalankan Aplikasi
```bash
npm start
```

### 4. Akses Aplikasi
- **Website Publik**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin/login
- **Username**: `admin`
- **Password**: `admin123`

---

## 📦 Prasyarat Sistem

Sebelum menginstall, pastikan komputer Anda memiliki:

### Node.js
- Versi: v14.0.0 atau lebih tinggi
- Download: https://nodejs.org/

Verifikasi instalasi:
```bash
node --version
npm --version
```

### Ruang Disk
- Minimal 500 MB untuk instalasi
- 100 MB untuk database dan uploads

---

## 🛠️ Instalasi Lengkap (Langkah demi Langkah)

### Step 1: Persiapan Folder

```bash
# Buat folder aplikasi (jika belum ada)
mkdir desav2
cd desav2
```

### Step 2: Download/Clone Repository

Jika menggunakan Git:
```bash
git clone <repository-url> .
```

Atau download file ZIP dan ekstrak ke folder `desav2`

### Step 3: Install Dependencies

```bash
npm install
```

Output yang diharapkan:
```
added 256 packages, and audited 257 packages
```

### Step 4: Konfigurasi Environment (Opsional)

Edit file `.env`:
```env
PORT=3000                                    # Ubah port jika diperlukan
NODE_ENV=development                        # Atau 'production'
SESSION_SECRET=your-secret-key-change-this # Ubah untuk production
DB_PATH=./database/desa_way_ilahan.db      # Path database
```

### Step 5: Inisialisasi Database

```bash
node setup-db.js
```

Output yang diharapkan:
```
✓ Database initialization completed!
✓ Admin account created
Username: admin
Password: admin123
```

**File database dibuat di**: `database/desa_way_ilahan.db`

### Step 6: Jalankan Aplikasi

**Mode Produksi:**
```bash
npm start
```

**Mode Development (dengan auto-reload):**
```bash
npm run dev
```

Output yang diharapkan:
```
========================================
Sistem Data Desa Way Ilahan
Server berjalan di: http://localhost:3000
Admin Login: http://localhost:3000/admin/login
========================================
```

---

## 🌐 Akses Aplikasi

Setelah server berjalan, buka browser dan akses:

### Halaman Publik
- **Beranda**: http://localhost:3000/
- **Profil Desa**: http://localhost:3000/profil-desa
- **Data Penduduk**: http://localhost:3000/data-penduduk
- **APBDes**: http://localhost:3000/apbdes
- **Berita**: http://localhost:3000/berita
- **Pengumuman**: http://localhost:3000/pengumuman
- **Kontak & Pengaduan**: http://localhost:3000/pengaduan

### Halaman Admin
- **Login**: http://localhost:3000/admin/login
- **Dashboard**: http://localhost:3000/admin/dashboard
- **Kelola Data Penduduk**: http://localhost:3000/admin/data-penduduk
- **Kelola Keuangan**: http://localhost:3000/admin/keuangan
- **Kelola Berita**: http://localhost:3000/admin/berita
- **Kelola Pengumuman**: http://localhost:3000/admin/pengumuman

---

## 🔐 Login Admin Default

```
Username: admin
Password: admin123
```

⚠️ **PENTING**: Ubah password setelah login pertama!

---

## 🔄 Menjalankan Aplikasi Kembali

Setelah instalasi pertama, cukup jalankan:

### Windows
```bash
npm start
```

### macOS/Linux
```bash
npm start
```

Atau gunakan script:
```bash
./start.sh  # Linux/macOS
start.sh    # Windows
```

---

## 📁 Struktur File Penting

```
desav2/
├── app.js              ← Entry point aplikasi
├── package.json        ← Konfigurasi npm
├── .env                ← Konfigurasi environment
├── setup-db.js         ← Script setup database
│
├── database/
│   └── desa_way_ilahan.db  ← File database SQLite
│
├── views/              ← Template HTML
├── public/
│   ├── css/style.css   ← Stylesheet
│   ├── js/main.js      ← JavaScript utilities
│   └── uploads/        ← Folder upload file
│
└── README.md           ← Dokumentasi
```

---

## 🐛 Troubleshooting

### Error: `npm command not found`
**Solusi**: Install Node.js dari https://nodejs.org/

### Error: `Port 3000 already in use`
**Solusi**: Ubah port di file `.env`
```env
PORT=3001
```

Atau kill proses yang menggunakan port 3000:

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
lsof -i :3000
kill -9 <PID>
```

### Error: `Cannot find module`
**Solusi**: Install ulang dependencies
```bash
rm -rf node_modules
npm install
```

### Error: `Database is locked`
**Solusi**: Pastikan hanya satu instance aplikasi yang berjalan
```bash
# Cek proses yang berjalan
ps aux | grep node  # Linux/macOS
tasklist | grep node  # Windows

# Kill jika ada duplikat
kill <PID>  # Linux/macOS
taskkill /PID <PID> /F  # Windows
```

### Error: `Module sqlite3 failed to compile`
**Solusi**: Install build tools

**Windows:**
```bash
npm install --global windows-build-tools
npm install
```

**macOS:**
```bash
xcode-select --install
npm install
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install build-essential python3
npm install
```

### Database tidak berinisialisasi
**Solusi**:
```bash
# Hapus database lama
rm database/desa_way_ilahan.db

# Buat database baru
node setup-db.js
```

---

## 🚀 Tips Pengembangan

### Development Mode dengan Auto-Reload
```bash
npm run dev
```
Aplikasi akan auto-restart saat ada perubahan file.

### Debug Mode
```bash
DEBUG=* npm start
```

### Check Dependencies
```bash
npm audit
npm outdated
```

### Update Dependencies
```bash
npm update
```

---

## 📊 Verifikasi Instalasi

Setelah instalasi, verifikasi dengan checklist:

- [ ] Node.js terinstall (`node --version`)
- [ ] npm terinstall (`npm --version`)
- [ ] Dependencies terinstall (`npm install` selesai)
- [ ] Database terbuat (`database/desa_way_ilahan.db` ada)
- [ ] Admin account terbuat (setup-db.js selesai)
- [ ] Server berjalan (`npm start` berhasil)
- [ ] Website publik dapat diakses (`http://localhost:3000`)
- [ ] Admin login berhasil (`http://localhost:3000/admin/login`)

---

## 🔒 Security Setup untuk Production

### 1. Ubah Default Admin Password
Login → Ubah di admin panel

### 2. Update Environment Variables
```env
NODE_ENV=production
SESSION_SECRET=generate-random-secret-key-here
```

Untuk generate secret key:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 3. Enable HTTPS
Gunakan reverse proxy seperti Nginx atau Apache

### 4. Backup Database
Secara berkala backup `database/desa_way_ilahan.db`

### 5. Set File Permissions (Linux)
```bash
chmod 755 database/
chmod 644 database/desa_way_ilahan.db
chmod 755 public/uploads/
```

---

## 📝 Opsi Pengembangan Lebih Lanjut

### Mengubah Port Default
Edit `.env`:
```env
PORT=8080
```

### Menambah Admin Baru
1. Login ke admin panel
2. Dashboard → Kelola Users (fitur future)
3. Atau akses database langsung dengan tool SQLite

### Ekspor Data
```bash
# Backup database
cp database/desa_way_ilahan.db database/backup-$(date +%Y%m%d).db
```

---

## 📞 Support & Help

Jika mengalami masalah:

1. Baca README.md untuk informasi lengkap
2. Periksa Troubleshooting section
3. Hubungi admin desa untuk bantuan teknis

---

## ✅ Checklist Instalasi Selesai

- [x] Node.js & npm terinstall
- [x] Repository di-download/clone
- [x] Dependencies diinstall (`npm install`)
- [x] Database disetup (`node setup-db.js`)
- [x] Environment diatur (optional)
- [x] Aplikasi berjalan (`npm start`)
- [x] Publik dan admin dapat diakses
- [x] Default admin login berhasil

🎉 **Selamat! Sistem Data Desa Way Ilahan siap digunakan.**

---

**Versi**: 1.0.0  
**Last Updated**: 2024  
**Untuk**: Desa Way Ilahan, Tanggamus, Lampung
