#!/bin/bash

echo "Starting deployment"

# Install Node.js and npm
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

cd /home/ubuntu/nocap.network || { echo "Error: Could not change directory"; exit 1; }

echo "Pulling latest changes from Git"
git pull origin main || { echo "Error: Could not pull latest changes"; exit 1; }

echo "Installing dependencies"
npm install || { echo "Error: Could not install dependencies"; exit 1; }

echo "Building the project"
npm run build || { echo "Error: Could not build the project"; exit 1; }

echo "Installing PM2"
npm install pm2 -g
pm2 ressurect
pm2 save


echo "Restarting the server with PM2"
pm2 restart nocap || { echo "Error: Could not restart the server"; exit 1; }

echo "Deployment successful!"
exit 0;
