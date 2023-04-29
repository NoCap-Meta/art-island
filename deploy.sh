#!/bin/bash
cd /home/ubuntu/nocap.network
git pull origin maain
npm run install &&
npm run build &&
pm2 restart nocap