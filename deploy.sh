#!/bin/bash
cd /home/ubuntu/nocap.network
git pull origin main
npm i &&
npm run build &&
pm2 restart nocap