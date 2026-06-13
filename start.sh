#!/bin/bash

# Start script untuk Desa Way Ilahan System

echo "==============================================="
echo "Sistem Data Desa Way Ilahan"
echo "==============================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Check if database exists, if not, setup
if [ ! -f "database/desa_way_ilahan.db" ]; then
    echo "🗄️  Setting up database..."
    node setup-db.js
    echo ""
fi

echo "🚀 Starting application..."
echo ""
npm start
