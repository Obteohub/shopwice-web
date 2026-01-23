#!/bin/bash
set -e # Exit on error

# Deployment Fix Script for Vultr/CloudPanel
# Usage: ./deploy.sh

echo ">>> Stopping shopwice process..."
# Using || true to prevent script failure if app doesn't exist yet
pm2 delete shopwice || true

echo ">>> Stashing any local changes (e.g. generated sitemaps)..."
git stash

echo ">>> Pulling latest code..."
git pull origin main

echo ">>> Rebuilding project..."
npm ci --include=dev
npm run build

echo ">>> Checking PM2 Config..."
cat ecosystem.config.js

echo ">>> Starting Server with PM2..."
pm2 start ecosystem.config.js
pm2 save

echo ">>> Done! Server should be running on Port 3001."
pm2 list
