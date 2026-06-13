require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const expressEjsLayouts = require('express-ejs-layouts');
const db = require('./database/init.js');
const { checkPublic, logActivity } = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layout');
app.set('view options', { layout: 'layout' });
app.use(expressEjsLayouts);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}));

// Activity logging middleware
app.use(logActivity);

// Public middleware
app.use(checkPublic);

// Routes
const publicRoutes = require('./routes/public');
const adminRoutes = require('./routes/admin');

app.use('/', publicRoutes);
app.use('/admin', adminRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { 
    message: 'Terjadi kesalahan pada server',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', { message: 'Halaman tidak ditemukan' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`Sistem Data Desa Way Ilahan`);
  console.log(`Server berjalan di: http://localhost:${PORT}`);
  console.log(`Admin Login: http://localhost:${PORT}/admin/login`);
  console.log(`========================================\n`);
});

module.exports = app;
