
# Project Tracker
This is Project Tracker , a project management website with sprinkle of CRM(Customer Relationship Management) and HRM(Human Resource Management)  where you can keep track of your client. It is a web-based project tracker designed to manage companies, users and hosting/domain details efficiently. Built with Laravel (backend), React (frontend) and TailwindCSS (UI).

This is internship project done by Niraj G.C. & Pradip Kr. Jaysawal for their BCA 7th semester.

## Technology Used
![PHP](https://img.shields.io/badge/php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-4479A1.svg?style=for-the-badge&logo=mysql&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)

## Features
1. Dashboard

- Overview of projects, companies, and user activities.

- Quick stats on active, inactive, and expired companies.

- Easy navigation to manage users and companies.

2. Users

- Role-based access:

- Admin: Full access to manage users, companies, and settings.

- Company: Can view and manage their own company details.

- User management: Add, edit, view, and delete users.

3. Companies

Each company record includes:

- User Info

        Name

        Email

        Personal Name

        Personal Phone

- Contact Details

        Phone

        Address

- Hosting & Domain

        Hosting

        Hosting Plan

        Domain

        Hosting Company

        Domain Company

        Hosting Plan Start

        Domain Plan Start

        Hosting Expiry Date

        Domain Expiry Date

- Documents

        Registration Document

        PAN Document

        Letter

- Charges

        Hosting Charge

        Domain Charge

        Maintenance Charge

        Hosting Renew Charge

        Domain Renew Charge

- Status

        Active, Inactive, Cancelled, Expired, Restricted

- Branding

        Company Logo

4. Additional Features

- Responsive UI with TailwindCSS.

- React-powered frontend for smooth user experience.

- Role-based authentication.

- CRUD functionality for Users and Companies.

- Filter/search companies by status or name.

- Easy setup with Laravel backend and Vite/React frontend.

## Deployment
To deploy this project run

1️⃣Clone the project
```bash
    git clone https://github.com/Plug-On/BITS-INTERNSHIP.git

    cd <project-folder>

```
2️⃣Install Node.js (frontend) dependencies
```bash
    composer install
```
3️⃣Set up environment
```bash
    php artisan key:generate
```
Update .env with your database credentials and other settings.

4️⃣ Run migrations (for database)
```bash
    php artisan migrate
```
5️⃣Run Laravel backend
```bash
    php artisan serve
```
6️⃣Run React frontend```bash
```bash  
    npm run build
```
7️⃣Access your project
Laravel backend: http://127.0.0.1:8000

React frontend (Vite dev server): usually http://localhost:5173


## Project Status
🚧 Work in Progress – The project is under active development. Features may change and some functionality may be incomplete.


## Authors

- [@NirajG.C.]https://github.com/Plug-On/)
- [@PradipJaysawal]https://github.com/PradipJaysawal/)

