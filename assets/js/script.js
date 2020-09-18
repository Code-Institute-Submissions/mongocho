$(document).ready(function () {
  const cards = document.querySelectorAll(".memory-card");
  const modal = document.querySelector(".stat-modal");
  // closes the modal after ending the game
  const closeButton = document.getElementById("close");
  // replay button on the modal after ending the game
  const replayButton = document.getElementById("play");
  // displays the number of pair counts on the board
  const counterDisplay = document.getElementById("counter-1");
  // restarts the game
  const restartButton = document.querySelector(".restart-btn");

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;
  // stores the count of pairs you have opened
  let counter = 0;
  // this variable determines when the game is finished, if closedCards equal 0 then the game has ended
  let closedCards = 0;

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    // increment the counter variable everytime a pair is opened
    secondCard = this;
    hasFlippedCard = false;
    counter++;
    counterDisplay.innerHTML = `Total pairs flipped: ${counter}`;

    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.image === secondCard.dataset.image;
    isMatch ? disableCards() : unflipCards();
  }

  // initially closedCards = 16, when successfully find a match value reduces by 2
  function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);
    closedCards -= 2;

    // makes the modal visible as it's hidden by default
    if (closedCards == 0) {
      setTimeout(() => {
        document.getElementById(
          "counter-2"
        ).innerHTML = `Total pairs flipped: ${counter}`; // runs to display the modal when closedCards = 0 (i.e when all matchs have being found)
        modal.style.display = "flex";
      }, 850);
    }
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

  // places cards ramdonly on restart
  const shuffle = () => {
    cards.forEach((card) => {
      let ramdomPos = Math.floor(Math.random() * 16);
      card.style.order = ramdomPos;
      closedCards++;
      card.addEventListener("click", flipCard);
    });
  };

  // this function is what restarts the game when the restart button or replay button is clicked.
  // It hides the modal, return counter and closedCards to zero and remove the .flip css class
  // so the cards can be flipped back to there hidden state
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

  // event listener added to the replay button to restart the game from modal
  if (replayButton) {
    replayButton.addEventListener("click", restart);
  }

  // event listener added to the restart button to restart the game from board
  if (replayButton) {
    restartButton.addEventListener("click", restart);
  }

  //shuffle the card
  shuffle();
});

function isSubscribed() {
  alert("Thanks for Subscribing");
}
