(function () {
  //find game board
  const board = document.querySelector("#gameboard");
  // declare lastClicked as a variable
  let lastClicked;
  // initialize "cards" array for function to push to
  let cards = [];
  // find reset button
  const resetButton = document.querySelector("#reset");
  const easyLevelbtn = document.querySelector(".easy");
  const hardLevelbtn = document.querySelector(".hard");

  // function to make cards
  function makeCard(img, cardType) {
    cards.push({
      imageLink: img,
      id: null,
      isClicked: false,
      type: cardType,
    });
  }

  function resetBoardHard() {
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
    makeCard("MCImgs/JoeMetheny.jpg", "metheny");
    makeCard("MCImgs/JoeMetheny.jpg", "metheny");
    makeCard("MCImgs/RichardRamirez.jpg", "ramirez");
    makeCard("MCImgs/RichardRamirez.jpg", "ramirez");
    makeCard("MCImgs/RodneyAlcala.jpg", "alcala");
    makeCard("MCImgs/RodneyAlcala.jpg", "alcala");
    makeCard("MCImgs/TedBundy.jpg", "bundy");
    makeCard("MCImgs/TedBundy.jpg", "bundy");
    makeCard("MCImgs/DennisRader.jpg", "rader");
    makeCard("MCImgs/DennisRader.jpg", "rader");
    //create an HTML card for every card in the array
    for (let i = 0; i < cards.length; i++) {
      board.innerHTML += `
        <div class="card ${cards[i].type}" data-card="${cards[i].type}">
          <img class="front" src="MCImgs/cardBackgroundDesign.png" alt="back of card" />
          <img class="back" src="${cards[i].imageLink}" alt="serialkiller" />
        </div>   
    `;
    }
  }

  function resetBoardEasy() {
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
    makeCard("MCImgs/JoeMetheny.jpg", "metheny");
    makeCard("MCImgs/JoeMetheny.jpg", "metheny");
    //create an HTML card for every card in the array
    for (let i = 0; i < cards.length; i++) {
      board.innerHTML += `
        <div class="card ${cards[i].type}" data-card="${cards[i].type}">
        <img class="front" src="MCImgs/cardBackgroundDesign.png" alt="back of card" />
        <img class="back" src="${cards[i].imageLink}" alt="serialkiller" />
        </div>   
    `;
    }
  }

  // calls reset board easy function when easy button is clicked
  easyLevelbtn.addEventListener("click", (event) => {
    resetBoardEasy()
  });

   // calls reset board hard function when hard button is clicked
  hardLevelbtn.addEventListener("click", (event) => {
    resetBoardHard();
  })

  // clears the board when reset button is clicked
  resetButton.addEventListener("click", (event) => {
    //clear array
    cards = [];
    // clear board in DOM
    board.innerHTML = "";
  });

  board.addEventListener("click", (event) => {
    //check if a card is clicked
    if (event.target.className === "front") {
      //store data-card value of clicked card in a variable
      let newClickedCard = event.target.parentNode.dataset.card;

      // add class "flipped" to div that holds clicked img
      event.target.parentNode.classList.add("flipped");

      // if lastClicked is not undefined and the data-card value of newClicked and lastClicked are the same
      if (lastClicked !== undefined && newClickedCard === lastClicked) {
        // call set timeout, which delays the running the card removal by 2 seconds
        setTimeout(function () {
          //remove cards from array
          cards = cards.filter((card) => card.type !== lastClicked);
          //remove cards from UI
          // querySelectorAll creates an array of cards that will be removed from the array
          let cardsToRemove = document.querySelectorAll(`.${lastClicked}`);
          // remove each card from cardsToRemove array
          for (card of cardsToRemove) {
            card.remove();
          }
        }, 2000);
      } else {
        // if card type values do not match, remove class flipped from cards after 3 sec
        setTimeout(function () {
          event.target.parentNode.classList.remove("flipped");
        }, 3000);
      }
      //make me undefined or newClicked, depending on match or not

      lastClicked = newClickedCard;
    }
  });
})();
