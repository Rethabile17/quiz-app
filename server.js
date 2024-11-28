const readline = require("readline");

const questions = [
    {
      question: "Who directed the movie 'Inception'?",
      options: ["1. Steven Spielberg", "2. Christopher Nolan", "3. Quentin Tarantino", "4. James Cameron"],
      answer: 2,
    },
    {
      question: "What is the highest-grossing film of all time (as of 2024)?",
      options: ["1. Titanic", "2. Avatar", "3. Avengers: Endgame", "4. Star Wars: The Force Awakens"],
      answer: 2,
    },
    {
      question: "Which actor played the character of Jack in 'Titanic'?",
      options: ["1. Brad Pitt", "2. Leonardo DiCaprio", "3. Tom Cruise", "4. Matt Damon"],
      answer: 2,
    },
    {
      question: "What is the name of the fictional African country in 'Black Panther'?",
      options: ["1. Zamunda", "2. Wakanda", "3. Genovia", "4. Elbonia"],
      answer: 2,
    },
    {
      question: "Which movie features the quote, 'I'll be back'?",
      options: ["1. The Terminator", "2. Predator", "3. Total Recall", "4. Commando"],
      answer: 1,
    },
    {
      question: "Who starred as the lead character in 'The Matrix' series?",
      options: ["1. Keanu Reeves", "2. Will Smith", "3. Tom Hardy", "4. Christian Bale"],
      answer: 1,
    },
    {
      question: "Which movie won the Academy Award for Best Picture in 2020?",
      options: ["1. 1917", "2. Parasite", "3. Joker", "4. Once Upon a Time in Hollywood"],
      answer: 2,
    },
    {
      question: "Who voiced the character of Woody in 'Toy Story'?",
      options: ["1. Tim Allen", "2. Tom Hanks", "3. Robin Williams", "4. Billy Crystal"],
      answer: 2,
    },
    {
      question: "What is the name of the hobbit played by Elijah Wood in 'The Lord of the Rings'?",
      options: ["1. Frodo", "2. Sam", "3. Pippin", "4. Merry"],
      answer: 1,
    },
    {
      question: "Which movie features a character named Ferris Bueller?",
      options: ["1. Sixteen Candles", "2. The Breakfast Club", "3. Ferris Bueller's Day Off", "4. Weird Science"],
      answer: 3,
    },
    {
      question: "In which year was the first 'Harry Potter' movie released?",
      options: ["1. 1999", "2. 2001", "3. 2003", "4. 2005"],
      answer: 2,
    },
    {
      question: "What is the name of the clown in 'It'?",
      options: ["1. Bozo", "2. Krusty", "3. Pennywise", "4. Ronald"],
      answer: 3,
    },
    {
      question: "Which Marvel movie introduced Black Widow?",
      options: ["1. Iron Man", "2. Iron Man 2", "3. The Avengers", "4. Captain America: The Winter Soldier"],
      answer: 2,
    },
    {
      question: "Who played the role of the Joker in 'The Dark Knight'?",
      options: ["1. Joaquin Phoenix", "2. Heath Ledger", "3. Jared Leto", "4. Jack Nicholson"],
      answer: 2,
    },
    {
      question: "What is the main theme of the movie 'Interstellar'?",
      options: ["1. Space Exploration", "2. Time Travel", "3. Artificial Intelligence", "4. Alien Invasion"],
      answer: 1,
    },
];

let score = 0;
let currentQuestionIndex = 0;
const questionTimeLimit = 10;
const totalQuizTimeLimit = 150;
let remainingQuizTime = totalQuizTimeLimit;
let quizTimer;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function askQuestion() {
  if (currentQuestionIndex >= questions.length) {
    return endQuiz();
  }

  const currentQuestion = questions[currentQuestionIndex];
  let timeLeft = questionTimeLimit;

  const displayQuestion = () => {
    process.stdout.write(`\n${currentQuestion.question} (${timeLeft}s left)\n`);
    currentQuestion.options.forEach((option) => console.log(option));
  };

  displayQuestion();

  const questionTimer = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      clearInterval(questionTimer);
      console.log("\nTime's up! Moving to the next question...");
      currentQuestionIndex++;
      askQuestion();
    }
  }, 1000);

  const userAnswer = await new Promise((resolve) => {
    rl.question("\nYour answer: ", (answer) => {
      clearInterval(questionTimer);
      resolve(answer);
    });
  });

  const answerNum = parseInt(userAnswer);

  if (
    isNaN(answerNum) ||
    answerNum < 1 ||
    answerNum > currentQuestion.options.length
  ) {
    console.log(
      "Invalid answer! Please enter a number corresponding to the options."
    );
    askQuestion();
    return;
  }

  if (answerNum === currentQuestion.answer) {
    console.log("Correct!");
    score++;
  } else {
    console.log(
      `Wrong answer! The correct answer is ${currentQuestion.answer}.`
    );
  }

  currentQuestionIndex++;
  askQuestion();
}

function startQuiz() {
  console.log("Quiz Started! You have limited time for each question.\n");

  quizTimer = setInterval(() => {
    remainingQuizTime--;
    if (remainingQuizTime <= 0) {
      clearInterval(quizTimer);
      console.log("\nTime's up for the quiz!");
      endQuiz();
    }
  }, 1000);

  askQuestion();
}

function endQuiz() {
  clearInterval(quizTimer);
  rl.close();
  console.log(`\nQuiz over! Your score is: ${score}/${questions.length}`);
  
  if (score >= 8) {
    console.log("Congratulations, you passed the quiz!");
  } else {
    console.log("Sorry, you failed the quiz. Better luck next time!");
  }
}

startQuiz();