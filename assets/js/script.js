$(document).ready(function () {
  const cards = document.querySelectorAll(".memory-card");
  const modal = document.querySelector(".stat-modal");
  const closeButton = document.getElementById("close"); // closes the modal after ending the game
  const replayButton = document.getElementById("play"); // replay button on the modal after ending the game
  const counterDisplay = document.getElementById("counter-1"); // displays the number of pair counts on the board
  const restartButton = document.querySelector(".restart-btn"); // restarts the game

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  let counter = 0; // stores the count of pairs you have opened
  let closedCards = 0;  // this variable determines when the game is finished, if closedCards equal 0 then the game has ended

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;
    hasFlippedCard = false;
    counter++;
    counterDisplay.innerHTML = `Total pairs flipped: ${counter}`; // increment the counter variable everytime a pair is opened

    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    closedCards -= 2; // initially closedCards = 16, when successfully find a match value reduces by 2
    
    if (closedCards == 0) {
      setTimeout(() => {
        document.getElementById(
          "counter-2"
        ).innerHTML = `Total pairs flipped: ${counter}`; // runs to display the modal when closedCards = 0 (i.e when all matchs have being found)
        modal.style.display = "flex"; 
      }, 850); 
    }// makes the modal visible as it's hidden by default
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      lockBoard = false;
      resetBoard();
    }, 1500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }

  const shuffle = () => {
    cards.forEach((card) => {
      let ramdomPos = Math.floor(Math.random() * 16); // places cards ramdonly on restart
      card.style.order = ramdomPos;
      closedCards++;
      card.addEventListener("click", flipCard);
    });
  };

  const restart = () => {
    modal.style.display = "none";
    closedCards = 0;
    counter = 0;
    counterDisplay.innerHTML = `Total pairs flipped: ${counter}`;
    const flippedCards = document.querySelectorAll(".flip");
    flippedCards.forEach((card) => {
      card.classList.remove("flip");
    });

    setTimeout(() => {
      shuffle();
    }, 500);
  };

  if (closeButton) {
    closeButton.addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (replayButton) {
    replayButton.addEventListener("click", restart);
  }

  if (replayButton) {
    restartButton.addEventListener("click", restart);
  }

  shuffle();
});

function isSubscribed() {
  alert("Thanks for Subscribing");
}
