import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

// Database configuration
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "0803",
  port: 5433,
});

// Connect to the database
db.connect();

let QUERY =
  "SELECT capitals.country, capitals.capital, flags.flag FROM capitals JOIN flags ON capitals.country = flags.name";

// Array to store quiz questions
let quiz = [];
// Query the database for capitals and store the results in the quiz array
db.query(QUERY, (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
  db.end(); // End the database connection
});

let totalCorrect = 0; // Counter for correct answers

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static("public")); // Serve static files from the 'public' directory

let currentQuestion = {}; // Current quiz question

// Route to serve the home page
app.get("/", async (req, res) => {
  totalCorrect = 0; // Reset the score
  await nextQuestion(); // Load the next question
  res.render("index.ejs", { question: currentQuestion }); // Render the page with the current question
});

// Route to handle form submissions
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim(); // Get and trim the user's answer
  console.log(answer); // Log the answer
  console.log(currentQuestion); // Log the current question
  let isCorrect = false; // Flag for correct answer
  // Check if the answer is correct
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++; // Increment score
    console.log(totalCorrect); // Log the total correct answers
    isCorrect = true; // Set the flag to true
  }

  nextQuestion(); // Load the next question
  // Render the page with the new question and score
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
  });
});

// Function to load the next question
async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
