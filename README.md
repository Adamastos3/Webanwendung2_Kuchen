# HS-Albsig Webanwendung2 Projekt

## Table of Contents

1. [General Info](#general-info)
2. [Installation](#installation)
3. [First use](#first-use)
4. [For info](#for-info)

## General Info

---

Is a web project for a pastry shop to provide a website with a web shop.

The status of the project is that it is functional, to the point that everything that has to do with sending mail still has to be configured

## Installation

---

A little intro about the installation.

```
$ git clone https://github.com/Adamastos3/Webanwendung2_Kuchen.git
$ cd ./frontend
$ npm install
$ npm start
$ cd ../backend
$ npm install
$ npm start
```

## First use

---

### Mail Functions

The function of sending e-mails is not activated during installation. This is because the settings for the mail account must be set individually.
The mail function is included below:

1. order confirmation: Sends an order confirmation
2. Registration: Sends a welcome email
3. password forgotten: Sends the new password to the user **(this is the only way the user can get the password)**
4. Contact: Sends a mail back to the person who wants to make contact and sends a mail with all the data to an internal mail.

If you want to activate the mail functions, you have to do the following:

```
1. Open the file mail.js (./frontend/Module/Nodemailer/mail.js)
2. Insert your personal mail data in the variable "transporter"
3. Open the file bestellung.js (./frontend/API_Access/Bestellung/bestellung.js)
4. Uncomment line 42 (order confirmation will be sent)
5. Open the file register.js (./frontend/API_Access/Register/register.js)
6. Uncomment line 115 (Welcome mail is being sent)
7. Open the File password.js (./frontend/API_Access/IhreDaten/password.js)
8. Uncomment line 65 (The new password is sent to the user)
9. Open the File kontakt.js (./frontend/API_Access/Kontakt/kontakt.js)
10. Uncomment line 8 (mail with all data is sent to an internal mail )
11. Uncomment line 9 (Reply mail to the person who wants to contact will be sent )
12. Enter your own e-mail address for the internal sending of the contact data in line 39.
```

### Database

All data in the database are sample data and do not correspond to reality. The database structure can be used without any problems. However, the data cannot be used for productive use and we therefore advise against it.

### Imprint & Nutritional table

The imprint and all nutritional tables for the products in the database, which is supplied, are demo versions and should be replaced accordingly

### Language

The entire project is designed for the German language and system settings

## For info

---

### Creation of API access codes

If someone wants to access the API, a 60-digit access code must be sent.
This can be created as follows:

```
1. Change to directory ./backend/Auth
2. Run the "createAuthString" function and save the output
3. Add the output to the Access database table
4. Restart the API

```
