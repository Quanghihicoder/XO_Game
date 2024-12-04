@echo off
setlocal

:: Prompt for MySQL username
set /p MYSQL_USER=Enter MySQL username: 

:: Prompt for MySQL password
set /p MYSQL_PASSWORD=Enter MySQL password: 

:: Login to MySQL and run init.sql
mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% < ./backend/sql/init.sql

:: Change directory to frontend and install npm packages
cd frontend
call npm install

:: Delete all .env files and create a new one with the specified content
del .env
echo REACT_APP_API_URL=http://localhost:8000 > .env

:: Run npm build for Windows
call npm run build-win

:: Change directory to backend and install npm packages
cd ..\backend
call npm install

:: Delete all .env files and create a new one with the specified content
del .env
(
echo DB_NAME=xogame
echo DB_USER=%MYSQL_USER%
echo DB_PASSWORD=%MYSQL_PASSWORD%
echo DB_HOST=localhost
echo DB_DIALECT=mysql
) > .env

:: Clear MySQL username and password variables
set MYSQL_USER=
set MYSQL_PASSWORD=

:: Start the backend
npm start

endlocal