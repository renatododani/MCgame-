(function () {
  //find game board
  const board = document.querySelector("#gameboard");
  // declare previouslyClickedCard as a variable
  let previouslyClickedCard = null;
  let newClickedCard = null;
  // initialize "cards" array for function to push to
  let cards = [];
  // initialize "level" variable to track selected level
  let level;
  let startTimer = null;
  let count = 0;
  const navTimer = document.querySelector('h3');
  const resetButton = document.querySelector("#reset");
  const easyLevelbtn = document.querySelector("#easy");
  const hardLevelbtn = document.querySelector("#hard");
  //find start button
  const startButton = document.querySelector(".start");
  //find menu
  const levelMenu = document.querySelector(".menu");
  //find end game screen
  const gameOver = document.querySelector("#game-over");
  //find header buttons
  const headerButtons = document.querySelector(".header-buttons");
  const seconds = document.querySelector("#seconds");
  const totalSeconds = document.querySelector("#total-seconds")
  const backToMenu = document.querySelector("#returnBack");
  // find audio container
  const audioContainer = document.querySelector("#audio-container");

  // function to make cards
  function makeCard(img, cardType) {
    cards.push({
      imageLink: img,
      isClicked: false,
      type: cardType,
      sortOrder: Math.floor(Math.random() * (level === "hard" ? 16 : 8)),
    });
  }

  function creatHTMLCards() {
    //create an HTML card for every card in the array
    for (let i = 0; i < cards.length; i++) {
      board.innerHTML += `
      <div>
        <div class="card ${cards[i].type}" data-card="${cards[i].type}">
          <img class="front" src="MCImgs/cardBackgroundDesign.png" alt="back of card" />
          <img class="back" src="${cards[i].imageLink}" alt="serialkiller" />
        </div>
      </div>
  `;
    }
  }
  function startAudio() {
    audioContainer.innerHTML += `<audio
      autoplay
      loop
      src="./MCImgs/MC-suspense.mp3"
      type="audio/mpeg"
    ></audio>`;
  }
  function stopAudio() {
    audioContainer.innerHTML = ` `;
  }

  function resetBoardHard() {
    //set level to hard
    level = "hard";
    //hide menu
    levelMenu.style.display = "none";
    //show game board on button click
    board.style.display = "grid";
    //show header buttons on click
    headerButtons.style.display = "initial";
    //clear array
    cards = [];
    // clear board in DOM
    board.innerHTML = "";
    //array of card objects being pushed
    makeCard("MCImgs/berkowitz.jpg", "berkowitz");
    makeCard("MCImgs/berkowitz.jpg", "berkowitz");
    makeCard("MCImgs/bundy.jpg", "bundy");
    makeCard("MCImgs/bundy.jpg", "bundy");
    makeCard("MCImgs/dahmer.jpg", "dahmer");
    makeCard("MCImgs/dahmer.jpg", "dahmer");
    makeCard("MCImgs/fish.jpg", "fish");
    makeCard("MCImgs/fish.jpg", "fish");
    makeCard("MCImgs/RichardRamirez.jpg", "ramirez"); //removes after only 1 is flipped
    makeCard("MCImgs/RichardRamirez.jpg", "ramirez");
    makeCard("MCImgs/RodneyAlcala.jpg", "alcala");
    makeCard("MCImgs/RodneyAlcala.jpg", "alcala");
    makeCard("MCImgs/gacy.jpg", "gacy");
    makeCard("MCImgs/gacy.jpg", "gacy");
    makeCard("MCImgs/rader.jpg", "rader");
    makeCard("MCImgs/rader.jpg", "rader");
    //randomize cards in the array by accesing random sortOrder property
    cards.sort((a, b) => {
      return a.sortOrder - b.sortOrder;
    });
    creatHTMLCards();
    startAudio();
  }

  function resetBoardEasy() {
    //set level to easy
    level = "easy";
    //hide menu
    levelMenu.style.display = "none";
    //display game board on click
    board.style.display = "grid";
    //show header buttons on click
    headerButtons.style.display = "initial";
    //clear array
    cards = [];
    // clear board in DOM
    board.innerHTML = "";
    //array of card objects being pushed
    makeCard("MCImgs/AileenWuornos.jpg", "wuornos");
    makeCard("MCImgs/AileenWuornos.jpg", "wuornos");
    makeCard("MCImgs/EdGein.jpg", "gein");
    makeCard("MCImgs/EdGein.jpg", "gein");
    makeCard("MCImgs/GaryRidgeway.jpg", "ridgeway");
    makeCard("MCImgs/GaryRidgeway.jpg", "ridgeway");
    makeCard("MCImgs/kemper.jpg", "kemper");
    makeCard("MCImgs/kemper.jpg", "kemper");
    //randomize cards in the array by accesing random sortOrder property
    cards.sort(function (a, b) {
      return a.sortOrder - b.sortOrder;
    });
    creatHTMLCards();
    startAudio();
  }

  startButton.addEventListener("click", (event) => {
    //will start timer
    if (count === 0) {
      startTimer = setInterval(function () {
        seconds.innerHTML = count;
        count++;
      }, 1000);
    }
  });

  // will stop timer
  function clearTimer() {
    clearInterval(startTimer);
    count = 0;
  }

  // calls reset board easy function when easy button is clicked
  easyLevelbtn.addEventListener("click", (event) => {
    resetBoardEasy();
  });

  // calls reset board hard function when hard button is clicked
  hardLevelbtn.addEventListener("click", (event) => {
    resetBoardHard();
  });

  // clears the board when reset button is clicked
  resetButton.addEventListener("click", (event) => {
    //clear array
    cards = [];
    // clear board in DOM
    board.innerHTML = "";
    if (level === "easy") {
      resetBoardEasy();
      // resetTimer();
    } else {
      resetBoardHard();
      // resetTimer();
    }
    clearTimer();
  });

  function cardClickListener() {
    //check if a card is clicked
    if (event.target.className === "front") {
      //store data-card value of clicked card in a variable
      newClickedCard = event.target.parentNode.dataset.card;
      console.log(newClickedCard);

      // add class "flipped" to div that holds clicked img
      event.target.parentNode.classList.add("flipped");

      //if the clicked cards match
      if (
        previouslyClickedCard !== null &&
        newClickedCard === previouslyClickedCard
      ) {
        //both variables have a click value- remove event listener
        board.removeEventListener("click", cardClickListener);
        //add a class to border color flash or something
        //initiate timeout, which removes matched cards in sync after 1.5sec
        setTimeout(function () {
          //remove cards from array
          cards = cards.filter((card) => card.type !== newClickedCard);
          //remove cards from UI
          // querySelectorAll creates an array of cards that will be removed from the array
          let cardsToRemove = document.querySelectorAll(`.${newClickedCard}`);
          // remove each card from cardsToRemove array
          for (card of cardsToRemove) {
            // allFlippedCards.push(card);
            card.remove();
            // if (allFlippedCards.length === 8 && isEasy === true) {
            //   console.log(allFlippedCards.length);
            // } else if (allFlippedCards.length === 16 && isEasy === false) {
            //   console.log(allFlippedCards.length);
            //   gameOver.style.display = "flex";
            //   seconds.innerHTML = count;
            // }
          }
          //reset variables to null
          previouslyClickedCard = null;
          newClickedCard = null;
          if (cards.length === 0) {
            totalSeconds.innerHTML = count;
            navTimer.style.display = 'none';
            clearTimer();
            //window.alert("Game Over");
            gameOver.style.display = "flex";
            stopAudio();
          }
          //add event listener back on
          board.addEventListener("click", cardClickListener);
        }, 1500);
      }
      //if no match and two clicks
      else if (previouslyClickedCard !== null) {
        // remove event listener so cannot click additional cards
        board.removeEventListener("click", cardClickListener);
        //initiate timeout, so after 1.5sec cards that do not match flip back over together
        setTimeout(function () {
          // if card type values do not match, put the flipped cards into an array
          let flippedCards = document.querySelectorAll(".flipped");
          //remove class flipped from the cards in flippedCards array
          for (card of flippedCards) {
            card.classList.remove("flipped");
          }
          //reset variables to null
          previouslyClickedCard = null;
          newClickedCard = null;
          //add event listener back on
          board.addEventListener("click", cardClickListener);
        }, 1500);
      }
      //if first run, shift variable value
      if (previouslyClickedCard === null) {
        previouslyClickedCard = newClickedCard;
      }
    }
  }

  //adds event listener, and calls function that runs flip/match logic
  board.addEventListener("click", cardClickListener);

  backToMenu.addEventListener("click", () => {
    gameOver.style.display = "none";
    board.style.display = "none";
    levelMenu.style.display = "flex";
    levelMenu.style.flexDirection = "column";
    levelMenu.style.justifyContent = "center";
    levelMenu.style.alignItems = "center";
    //levelMenu.style.marginLeft = "30%";
  });
})();
