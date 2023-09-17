// Get DOM elements
const gameContainer = document.querySelector(".container"),
  userResult = document.querySelector(".user_result img"),
  cpuResult = document.querySelector(".cpu_result img"),
  result = document.querySelector(".result"),
  optionImages = document.querySelectorAll(".option_image"),
  userScoreDisplay = document.querySelector(".user_score"),
  cpuScoreDisplay = document.querySelector(".cpu_score"),
  gameOverMessage = document.querySelector(".game_over_message");

let userScore = 0;
let cpuScore = 0;
let cpuWins = 0; // Menyimpan jumlah kemenangan CPU
const winningScore = 5; // Set skor kemenangan
const maxUserScore = 3;
const maxCpuScore = 5;





// Function to update the score displays
function updateScore() {
  userScoreDisplay.textContent = userScore;
  cpuScoreDisplay.textContent = cpuScore;
}

// Function to handle game over
function gameOver() {
  if (userScore >= winningScore) {
    gameOverMessage.textContent = "Game over user wins the game!";
  } else if (cpuScore >= winningScore) {
    gameOverMessage.textContent = "Game over cpu wins the game!";
  } else if (cpuWins >= 5) { // Menambahkan kondisi jika CPU menang 5 kali
    gameOverMessage.textContent = "CPU wins 5 times, Game Over!";
  }

  // Menonaktifkan gambar pilihan
  optionImages.forEach((image, index) => {
    image.removeEventListener("click");
  });
}

// Loop through each option image element
optionImages.forEach((image, index) => {
  image.addEventListener("click", (e) => {
    image.classList.add("active");

    let imageSrc = e.target.querySelector("img").src;
    userResult.src = imageSrc;

    result.textContent = "Wait...";

    optionImages.forEach((image2, index2) => {
      index !== index2 && image2.classList.remove("active");
    });

    gameContainer.classList.add("start");

    // Set a timeout to delay the result calculation
    let time = setTimeout(() => {
      gameContainer.classList.remove("start");



      let imageSrc = e.target.querySelector("img").src;
      userResult.src = imageSrc;

      if (userScore < 3 && cpuScore < 5) {
        let randomNumber = Math.floor(Math.random() * 3);
        let cpuImages = ["images/batu.png", "images/kertas.png", "images/gunting.png"];
        cpuResult.src = cpuImages[randomNumber];

        let cpuValue = ["R", "P", "S"][randomNumber];
        let userValue = ["R", "P", "S"][index];

        let outcomes = {
          RR: "Cpu",
          RP: "Cpu",
          RS: "User",
          PP: "Draw",
          PR: "User",
          PS: "Cpu",
          SS: "Cpu",
          SR: "Cpu",
          SP: "User",

        };

        let outComeValue = outcomes[userValue + cpuValue];

        const maxUserScore = 3;
        const maxCpuScore = 5;


        if (userValue === cpuValue) {
          result.textContent = "coba lagi !!";
        } else {
          result.textContent = `${outComeValue} menang yeay!!`;
          if (outComeValue === "User") {
            userScore++;
          } else {
            cpuScore++;
            cpuWins++; // Menambahkan kemenangan CPU
          }
          updateScore();

          // Check if the game is over
          if (userScore >= 3 || cpuScore >= winningScore || cpuWins >= 5) {
            gameOver();
          }
        }
      }
    }, 2500);
  });
});

// Function to restart the game
function restartGame() {
  userScore = 0;
  cpuScore = 0;
  cpuWins = 0;
  updateScore();
  gameOverMessage.textContent = "";
  optionImages.forEach((image) => {
    image.addEventListener("click", handleOptionClick);
    image.classList.remove("active");
  });
}

// Function to handle option click
function handleOptionClick(e) {
  // ...
  // (Kode yang sama seperti sebelumnya untuk menangani klik pilihan)
  // ...

  // Check if the game is over and restart if necessary
  if (userScore >= 3 || cpuScore >= winningScore || cpuWins >= 5) {
    restartGame();
  }
}

// Restart the game initially
restartGame();

