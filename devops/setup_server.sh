#!/bin/bash

# Update and upgrade the system
sudo apt-get update -y
sudo apt-get upgrade -y

# Install Apache HTTP server
sudo apt-get install apache2 -y
sudo ufw allow 'Apache'
sudo ufw enable

# Install Node.js and npm
sudo apt-get install -y nodejs
sudo apt-get install -y npm

# Install MySQL and set root user password
sudo apt-get install mysql-server -y
sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'root';"
sudo mysql -e "FLUSH PRIVILEGES;"

# Install PM2
sudo npm install -g pm2

# Install EC2 Instance Connect
sudo apt-get install ec2-instance-connect -y

# Create Downloads directory if it doesn't exist
mkdir -p ~/Downloads

# Set permissions for the Downloads directory
sudo chmod 755 ~/Downloads

# Clone the Git repository to the Downloads folder
cd ~/Downloads
git clone https://github.com/Quanghihicoder/XO_Game.git

# Navigate to the cloned repository folder
# cd ./XO_Game/backend

# Set permissions for the cloned repository
sudo chmod -R 755 ~/Downloads/XO_Game

# Install npm dependencies
# npm install

# Start the application using PM2
# pm2 start npm --name "your-app-name" -- start