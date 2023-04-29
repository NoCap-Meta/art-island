#!/bin/bash
echo "Starting deployment"
cd /home/ubuntu/nocap.network || { echo "Error: Could not change directory"; exit 1; }
echo "Pulling latest changes from Git"
git pull origin main || { echo "Error: Could not pull latest changes"; exit 1; }
echo "Installing dependencies"
npm i || { echo "Error: Could not install dependencies"; exit 1; }
echo "Building the project"
npm run build || { echo "Error: Could not build the project"; exit 1; }
echo "Restarting the server with PM2"
pm2 restart nocap || { echo "Error: Could not restart the server"; exit 1; }
echo "Deployment successful!"
exit 0;
