# 👥 Panduan Pengguna - Sistem Data Desa Way Ilahan

## 📖 Untuk Masyarakat (Pengguna Publik)

### Akses Website

1. **Buka Browser** (Chrome, Firefox, Safari, Edge, dll)
2. **Ketik URL**: `http://localhost:3000` atau alamat website desa
3. **Tekan Enter**

### Menu Utama

#### 1. 🏠 Beranda
- Menampilkan informasi utama desa
- Berita terbaru
- Akses cepat ke menu penting

**Cara menggunakan:**
- Scroll ke bawah untuk melihat berita terbaru
- Klik tombol untuk akses cepat ke informasi yang diinginkan

#### 2. 📋 Profil Desa
- Informasi umum desa (nama, lokasi, kode pos)
- Visi dan Misi desa
- Deskripsi singkat desa

**Cara menggunakan:**
- Baca informasi yang tersedia
- Tidak ada action khusus, hanya untuk melihat

#### 3. 👥 Data Penduduk
- Daftar lengkap warga desa
- Informasi: NIK, nama, alamat, pekerjaan, dll

**Cara menggunakan:**
1. Klik menu "Data Penduduk"
2. Lihat tabel dengan daftar penduduk
3. Gunakan fitur paginasi untuk melihat halaman berikutnya
4. Gunakan search untuk mencari penduduk tertentu

#### 4. 🗺️ Data Dusun/RW/RT
- Struktur administratif desa
- Daftar dusun dengan jumlah RW/RT
- Kepala dusun masing-masing

**Cara menggunakan:**
- Buka menu "Data Dusun/RW/RT"
- Lihat struktur wilayah desa

#### 5. 👔 Aparatur Desa
- Profil perangkat desa (kepala desa, sekretaris, dll)
- Foto, kontak, alamat

**Cara menggunakan:**
- Buka menu "Aparatur Desa"
- Lihat kartu profil setiap perangkat
- Klik untuk informasi lebih detail

#### 6. 💰 APBDes (Anggaran Pendapatan Belanja Desa)
- Anggaran keuangan desa
- Item pengeluaran dan jumlahnya
- Status anggaran (terencana, dalam proses, selesai)

**Cara menggunakan:**
1. Klik menu "APBDes"
2. Pilih tahun anggaran (dropdown)
3. Lihat tabel dengan rincian anggaran
4. Lihat total anggaran di bawah

#### 7. 📊 Realisasi Anggaran
- Progress pencapaian anggaran
- Perbandingan anggaran vs realisasi
- Grafik progress

**Cara menggunakan:**
1. Klik menu "Realisasi Anggaran"
2. Lihat tabel dengan progress bar
3. Persentase menunjukkan pencapaian

#### 8. 🏗️ Program dan Kegiatan
- Daftar program pembangunan desa
- Tanggal, lokasi, penanggung jawab
- Status program

**Cara menggunakan:**
- Buka menu "Program dan Kegiatan"
- Lihat kartu setiap program
- Baca deskripsi program

#### 9. 📰 Berita Desa
- Berita dan informasi terkini
- Disertai foto dan tanggal publikasi

**Cara menggunakan:**
1. Klik menu "Berita"
2. Lihat daftar berita terbaru
3. Klik "Baca Selengkapnya" untuk membaca detail
4. Gunakan paginasi untuk berita lebih lama

#### 10. 📢 Pengumuman
- Pengumuman resmi desa
- Informasi penting untuk warga

**Cara menggunakan:**
- Buka menu "Pengumuman"
- Baca pengumuman yang tersedia
- Scroll untuk melihat pengumuman lama

#### 11. 🖼️ Galeri Foto
- Foto dokumentasi kegiatan desa
- Foto keindahan desa
- Kategorisasi foto

**Cara menggunakan:**
- Buka menu "Galeri"
- Lihat grid foto-foto
- Klik foto untuk melihat lebih besar

#### 12. 📄 Dokumen Publik
- File resmi desa untuk diunduh
- Laporan, SK, surat, dll

**Cara menggunakan:**
1. Buka menu "Dokumen Publik"
2. Lihat daftar dokumen
3. Klik tombol "Unduh" untuk download file

#### 13. 📧 Kontak & Pengaduan
- Hubungi desa
- Kirim pengaduan, saran, atau masukan

**Cara menggunakan:**
1. Buka menu "Kontak & Pengaduan"
2. Isi form dengan:
   - Nama lengkap
   - Email
   - Nomor telepon (opsional)
   - Judul pengaduan/saran
   - Isi pengaduan/saran
3. Klik "Kirim Pengaduan"
4. Tunggu konfirmasi

---

## 👨‍💼 Untuk Administrator (Admin Desa)

### Login Admin

1. **Akses Halaman Login**
   - URL: `http://localhost:3000/admin/login`
   - Atau klik "Login Admin" di navbar

2. **Masukkan Kredensial**
   - Username: `admin` (default)
   - Password: `admin123` (default)

3. **Klik Tombol Login**

4. **Masuk ke Dashboard**

⚠️ **Keamanan**: Segera ubah password setelah login pertama!

### Dashboard Admin

Halaman utama admin menampilkan:
- Statistik: Total penduduk, berita, pengumuman, pengaduan baru
- Aktivitas terakhir
- Akses cepat ke menu penting

### Menu Admin

#### 1. 📊 Dashboard
- Overview statistik desa
- Log aktivitas terakhir
- Akses cepat ke semua menu

#### 2. 👥 Kelola Data Penduduk

**Melihat Data:**
1. Klik "Data Penduduk"
2. Lihat tabel data penduduk
3. Gunakan paginasi untuk halaman berikutnya
4. Gunakan search untuk mencari

**Menambah Penduduk:**
1. Klik tombol "Tambah Penduduk"
2. Isi form dengan data lengkap:
   - NIK (16 digit)
   - Nama
   - Tempat dan tanggal lahir
   - Jenis kelamin
   - Status pernikahan
   - Alamat
   - Dusun, RW, RT
   - Pekerjaan
   - Pendidikan
   - Agama
3. Klik "Simpan"

**Mengedit Penduduk:**
1. Cari penduduk di tabel
2. Klik tombol "Edit"
3. Ubah data yang diperlukan
4. Klik "Simpan"

**Menghapus Penduduk:**
1. Cari penduduk di tabel
2. Klik tombol "Hapus"
3. Konfirmasi penghapusan

#### 3. 💰 Kelola Keuangan Desa (APBDes)

**Melihat Data:**
1. Klik menu "Keuangan Desa"
2. Pilih tahun di dropdown
3. Lihat tabel APBDes

**Menambah Item Keuangan:**
1. Klik "Tambah Item Keuangan"
2. Isi form:
   - Tahun
   - Item pengeluaran
   - Jumlah (dalam rupiah)
   - Keterangan
3. Klik "Simpan"

**Mengubah Status:**
1. Di tabel, cari item yang ingin diubah
2. Ubah dropdown "Status" menjadi:
   - Terencana
   - Dalam Proses
   - Selesai
3. Sistem otomatis menyimpan

**Menghapus Item:**
1. Klik tombol "Hapus"
2. Konfirmasi

#### 4. 📰 Kelola Berita

**Melihat Berita:**
1. Klik menu "Berita"
2. Lihat daftar berita yang sudah dipublikasi

**Menulis Berita Baru:**
1. Klik "Tulis Berita Baru"
2. Isi form:
   - Judul berita
   - Penulis
   - Upload foto (opsional)
   - Isi berita (tulis dengan detail)
3. Klik "Publish"

**Menghapus Berita:**
1. Cari berita di list
2. Klik tombol "Hapus"
3. Konfirmasi penghapusan

#### 5. 📢 Kelola Pengumuman

**Membuat Pengumuman:**
1. Klik menu "Pengumuman"
2. Klik "Buat Pengumuman Baru"
3. Isi form:
   - Judul pengumuman
   - Isi pengumuman
4. Klik "Publish"

**Menghapus Pengumuman:**
1. Cari pengumuman
2. Klik "Hapus"
3. Konfirmasi

---

## ⚙️ Panduan Umum

### Upload File

**Untuk Foto:**
- Format: JPG, PNG, GIF
- Ukuran max: 2-5 MB
- Resolusi: 1024x768 atau lebih besar

**Untuk Dokumen:**
- Format: PDF, DOC, DOCX, XLS, XLSX, ZIP
- Ukuran max: 10 MB

### Form Input

**Validasi Form:**
- Field bertanda * (bintang) = wajib diisi
- Email harus format valid: nama@domain.com
- Nomor hanya angka
- Tanggal format: YYYY-MM-DD

### Search & Filter

**Mencari Data:**
1. Gunakan search box
2. Ketik keyword
3. Tekan Enter atau klik tombol search

**Filter Tahun:**
- Beberapa menu memiliki dropdown tahun
- Pilih tahun yang diinginkan
- Sistem otomatis meload data

---

## 🔒 Keamanan

### Password

**Ubah Password Admin:**
1. Login ke admin panel
2. (Fitur update password belum tersedia di v1.0)
3. Hubungi admin teknis untuk reset

**Password Guidelines:**
- Minimal 8 karakter
- Kombinasi huruf, angka, simbol
- Jangan berikan ke orang lain

### Session

- Sesi aktif selama: 24 jam
- Auto logout jika ada inaktivitas
- Logout: Klik menu "Logout"

---

## ❓ FAQ

### Q: Bagaimana cara login?
**A:** Buka http://localhost:3000/admin/login, masukkan username dan password

### Q: Lupa password admin?
**A:** Hubungi admin teknis atau petugas IT desa

### Q: Bagaimana cara menambah warga?
**A:** Login → Menu Data Penduduk → Klik "Tambah Penduduk" → Isi form → Simpan

### Q: Bisa edit data yang sudah dimasukkan?
**A:** Ya, cari data, klik Edit, ubah, lalu Simpan

### Q: Apakah data aman?
**A:** Data disimpan di database SQLite yang terlindungi. Hanya admin yang bisa mengubah.

### Q: Berapa ukuran file yang bisa diupload?
**A:** Foto max 2-5 MB, dokumen max 10 MB

### Q: Apa yang terjadi jika lupa Logout?
**A:** Sesi akan otomatis expire setelah 24 jam

---

## 📞 Kontak Support

Jika mengalami masalah teknis:

- **Email**: admin@desawayilahan.id
- **Telepon**: (0726) XXXXXXX
- **Kantor**: Kantor Desa Way Ilahan

---

## 📚 Panduan Tambahan

### Mencetak Data
1. Buka halaman yang ingin dicetak
2. Tekan Ctrl+P (Windows) atau Cmd+P (Mac)
3. Pilih printer
4. Klik "Print"

### Ekspor Data (Untuk Admin)
- Fitur expor belum tersedia di v1.0
- Hubungi admin teknis untuk bantuan

### Backup Data
- Dilakukan otomatis oleh sistem
- Hubungi admin teknis untuk restore data

---

## 🎯 Tips & Trik

### Agar Website Lebih Cepat
1. Bersihkan cache browser: Ctrl+Shift+Del
2. Gunakan browser terbaru
3. Koneksi internet stabil

### Menggunakan Keyboard Shortcuts
- Tab: Pindah antar field form
- Enter: Submit form
- Esc: Tutup dialog

### Mobile Friendly
- Website dapat diakses dari smartphone
- Tampilannya otomatis menyesuaikan

---

**Versi**: 1.0.0  
**Terakhir Update**: 2024  
**Untuk**: Desa Way Ilahan, Tanggamus, Lampung
