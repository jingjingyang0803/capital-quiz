# capital-quiz

The World Capital Quiz, a course project for course The Complete 2023 Web Development Bootcamp (AppBrewery), is an interactive web application that tests users' knowledge of world capitals. Built with Express.js and PostgreSQL, it offers a fun and educational way to learn about different countries and their capitals.

## **Features**

- Interactive quiz on world capitals.
- Score tracking for correct answers.
- Responsive web design.

## **Installation**

1. Clone the repository.
2. Install dependencies: **`npm install`**.
3. Set up a PostgreSQL database.

## **Database Setup**

- Import **`capitals.csv`** into your PostgreSQL server:
  1. Create a new database named **`world`**.
  2. Create a table **`capitals`** with the following columns: `id serial primary key`, `country varchar(45)`, `capital varchar(45)`.
  3. Import the data from **`capitals.csv`**.
  4. Create a table **`flags`** with the following columns: `id serial primary key`, `name varchar(45)`, `flag text`.
  5. Import the data from **`flags.csv`**.
- Please modify the database configuration below in your `index.js` file according to your specific PostgreSQL setup. Make sure to replace "postgres" with your username, "localhost" with your host, "world" with your database name, "0803" with your password, and "5433" with your port number.
  ```jsx
  // Database configuration
  const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "world",
    password: "0803",
    port: 5433,
  });
  ```

## **Running the Application**

- Start the server: `**nodemon index.js**`.
- Access the quiz at **`http://localhost:3000`**.
