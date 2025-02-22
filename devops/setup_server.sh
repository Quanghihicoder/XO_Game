#!/bin/bash

# Update and upgrade the system
sudo apt-get update -y
sudo apt-get upgrade -y

# Install NGINX
sudo apt install nginx -y

# Route port 80 to 8000

NGINX_CONF="/etc/nginx/sites-available/default"
PORT_FORWARD=8000

sudo tee $NGINX_CONF > /dev/null <<EOL
server {
    listen 80;
    server_name localhost;
    
    location / {
        proxy_pass http://127.0.0.1:$PORT_FORWARD;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    }
}
EOL

# Test new nginx setup
sudo nginx -t

# Restart nginx
if [ $? -eq 0 ]; then
    echo "Restarting Nginx..."
    sudo systemctl restart nginx
else
    echo "Nginx configuration test failed. Please check manually."
    exit 1
fi

# Allow traffic
sudo ufw allow 80/tcp

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