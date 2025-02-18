#!/bin/bash

# Update and upgrade the system
sudo apt-get update -y
sudo apt-get upgrade -y

# Install Apache HTTP server
sudo apt-get install apache2 -y

# Install Node.js and npm
sudo apt install curl
curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MySQL and set root user password
sudo apt-get install mysql-server -y
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'root';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Start MySQL and Node.js services
sudo systemctl start mysql
sudo systemctl enable mysql

# Install PM2
sudo npm install -g pm2

# Create Downloads directory if it doesn't exist
sudo mkdir -p ~/Downloads

# Clone the Git repository to the Downloads folder
cd ~/Downloads
sudo git clone https://github.com/Quanghihicoder/XO_Game.git

# Set permissions for the cloned repository
sudo chmod -R 777 ~/Downloads/XO_Game

# Navigate to the cloned repository folder
cd ./XO_Game

# Run script 
sudo chmod 755 ./setup_mac.sh
./setup_mac.sh -u root -p root -r