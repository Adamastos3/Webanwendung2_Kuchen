# HS-Albsig Webanwendung2 Projekt

## Table of Contents

1. [General Info](#general-info)
2. [Installation](#installation)

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

### Pay attention

---

The function of sending e-mails is not activated during installation. This is because the settings for the mail account must be set individually.
The mail function is included below:

1. order confirmation: Sends an order confirmation
2. Registration: Sends a welcome email
3. password forgotten: Sends the new password to the user **(this is the only way the user can get the password)**

If you want to activate the mail functions, you have to do the following:

```
1. Open the file mail.js (./frontend/Module/Nodemailer/mail.js)
2. Insert your personal mail data in the variable "transporter"
3. Open the file bestellung.js (./frontend/API_Access/Bestellung/bestellung.js)
4. Uncomment line 47 (order confirmation will be sent)
5. Open the file register.js (./frontend/API_Access/Register/register.js)
6. Uncomment line 125 (Welcome mail is being sent)
7. Open the File password.js (./frontend/API_Access/IhreDaten/password.js)
8. Uncomment line 75 (The new password is sent to the user)
```
