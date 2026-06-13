// Middleware untuk mengecek apakah user sudah login
function checkAuth(req, res, next) {
  if (req.session && req.session.admin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Middleware untuk mengecek apakah bukan admin (untuk halaman publik)
function checkPublic(req, res, next) {
  // Jika sudah login, tambahkan informasi user
  if (req.session && req.session.admin) {
    res.locals.isLoggedIn = true;
    res.locals.admin = req.session.admin;
  } else {
    res.locals.isLoggedIn = false;
  }
  next();
}

// Middleware untuk logging aktivitas
function logActivity(req, res, next) {
  const db = require('../database/init.js');
  
  res.on('finish', () => {
    if (req.session && req.session.admin && req.method !== 'GET') {
      const aksi = `${req.method} ${req.path}`;
      db.run(
        `INSERT INTO log_aktivitas (admin_id, aksi, keterangan) 
         VALUES (?, ?, ?)`,
        [req.session.admin.id, aksi, req.body ? JSON.stringify(req.body) : ''],
        (err) => {
          if (err) console.error('Error logging activity:', err);
        }
      );
    }
  });
  
  next();
}

module.exports = {
  checkAuth,
  checkPublic,
  logActivity
};
