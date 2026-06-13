// Middleware untuk mengecek apakah user admin sudah login
function checkAuth(req, res, next) {
  if (req.session && req.session.admin) {
    next();
  } else {
    res.redirect('/admin/login');
  }
}

// Middleware untuk mengecek apakah user publik sudah login
function checkPublicAuth(req, res, next) {
  if (req.path.startsWith('/admin')) {
    return next();
  }

  if (req.path === '/login' || req.path === '/logout' || req.path === '/register' || req.path === '/public-login') {
    return next();
  }

  if (req.session && req.session.publicUser) {
    return next();
  }

  return res.redirect('/login');
}

// Middleware untuk mengecek session dan memberikan data user ke view
function checkPublic(req, res, next) {
  if (req.session && req.session.admin) {
    res.locals.isLoggedIn = true;
    res.locals.admin = req.session.admin;
  } else {
    res.locals.isLoggedIn = false;
    res.locals.admin = null;
  }

  if (req.session && req.session.publicUser) {
    res.locals.publicUser = req.session.publicUser;
    res.locals.isPublicLoggedIn = true;
  } else {
    res.locals.publicUser = null;
    res.locals.isPublicLoggedIn = false;
  }

  next();
}

// Middleware untuk logging aktivitas admin
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
  checkPublicAuth,
  logActivity
};
