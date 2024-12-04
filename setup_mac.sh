#!/bin/bash

# Prompt for MySQL username
read -p "Enter MySQL username: " MYSQL_USER

# Prompt for MySQL password
read -sp "Enter MySQL password: " MYSQL_PASSWORD
echo

# Login to MySQL and run init.sql
mysql -u "$MYSQL_USER" -p"$MYSQL_PASSWORD" < ./backend/sql/init.sql

# Change directory to frontend and install npm packages
cd frontend
npm install

# Delete all .env files and create a new one with the specified content
rm -f .env
echo "REACT_APP_API_URL=http://localhost:8000" > .env

# Run npm build for macOS
npm run build-mac

# Change directory to backend and install npm packages
cd ../backend
npm install

# Delete all .env files and create a new one with the specified content
rm -f .env
{
  echo "DB_NAME=xogame"
  echo "DB_USER=$MYSQL_USER"
  echo "DB_PASSWORD=$MYSQL_PASSWORD"
  echo "DB_HOST=localhost"
  echo "DB_DIALECT=mysql"
} > .env

# Clear MySQL username and password variables
unset MYSQL_USER
unset MYSQL_PASSWORD

# Start the backend
npm start