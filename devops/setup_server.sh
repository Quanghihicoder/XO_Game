#!/bin/bash

# Update and upgrade the system
sudo apt-get update -y
sudo apt-get upgrade -y

# Install Apache HTTP server
sudo apt-get install apache2 -y
sudo ufw allow 'Apache'

# Install Node.js and npm
sudo apt-get install -y nodejs
sudo apt-get install -y npm

# Install MySQL and set root user password
sudo apt-get install mysql-server -y
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'root';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Install PM2
sudo npm install -g pm2

# Clone the Git repository to the Downloads folder
cd ~/Downloads
git clone https://github.com/Quanghihicoder/XO_Game.git

# Navigate to the cloned repository folder
# cd ./XO_Game/backend

# Install npm dependencies
# npm install

# Start the application using PM2
# pm2 start npm --name "your-app-name" -- start

