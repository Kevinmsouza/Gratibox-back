# **Gratibox**

The idea for this project came from [this](https://github.com/driven-exercises/Projeto-GratiBox) technical challenge.

### **About the project**
[view demo](https://kms-gratibox-front.vercel.app/)

<br />
<p align="center">
    <img src="https://media.discordapp.net/attachments/285125331751534602/912425839663124520/unknown.png?width=328&height=543" width="250px">
<p>

Gratibox is a single page application designed to be used by mobile devices such as cell phones and tablets.

Its premise is to be a subscription service to deliver "gratitude" and mental health items such as teas, organic products and incenses.

<br />

### **Built with**

- [React JS](https://reactjs.org/)
- [Node JS](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)

 <br />

## **Getting Started**

### **Prerequisites**

- npm

<br />

### **Installation**

1.  Clone the backend

```sh
git clone https://github.com/Kevinmsouza/Gratibox-back.git
```

2. Clone the frontend **in another folder**

```sh
git clone https://github.com/Kevinmsouza/Gratibox-front.git
```

3. Install the dependencies executing command **in both folders**

```sh
npm i
```

4. Create a .env file in gratibox-back folder (root) with following variables ( example values )

```sh
DB_USER=postgres
DB_PASSWORD=123456
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=gratibox
PORT=4000
```

5. Create a postgres database and fill .env with database credentials

   <br />

6. Use the dump.sql to create the tables of the database

```sh
psql -d nameOfNewDatabase -f dump.sql
```
   <br />
   <br />

### **How to run**

1. Start backend server

```sh
npm run start
```

2. Start frontend

```sh
npm start
```

#### **Note**: Don't forget to toggle device emulation inside the dev tools of your browser.
