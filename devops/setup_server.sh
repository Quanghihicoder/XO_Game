#!/bin/bash

# Update and upgrade the system
sudo apt-get update -y
sudo apt-get upgrade -y

# Install NGINX
sudo apt install nginx openssl -y

# Route port 80 to 8000
NGINX_CONF="/etc/nginx/sites-available/default"
PORT_FORWARD=8000

# Create NGINX configuration
cat > /etc/nginx/sites-available/default <<EOL
    server {
        listen 8000;
        server_name _;

        location / {
            proxy_pass http://127.0.0.1:8000;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
    }
EOL

# Generate a self-signed SSL certificate (for testing)
sudo mkdir -p /etc/nginx/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt -subj "/C=US/ST=State/L=City/O=Company/CN=example.com"

# Test and restart nginx
sudo nginx -t && sudo systemctl restart nginx

# Allow necessary traffic
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

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