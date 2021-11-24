(function () {
  //find game board
  const board = document.querySelector("#gameboard");
  let lastClicked;
  let cards = [];
  // function to make cards
  function makeCard(img, cardType) {
    cards.push({
      imageLink: img,
      id: null,
      isClicked: false,
      type: cardType,
    });
  }
  //array of card objects
  function resetBoard() {
    //make me less redundant
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
    for (let i = 0; i < 16; i++) {
      board.innerHTML += `
        <div class="card ${cards[i].type}" data-card="${cards[i].type}">
          <img class="front" src="MCImgs/Oak-Leaf-Back.jpg" alt="back of card" />
          <img class="back" src="${cards[i].imageLink}" alt="serialkiller" />
        </div>
    `;
    }
  }
  resetBoard();
  board.addEventListener("click", (event) => {
    //check if a card is clicked
    if (event.target.className === "front") {
      //set clicked card
      let newClickedCard = event.target.parentNode.dataset.card;
      event.target.parentNode.classList.add("flipped");
      if (lastClicked !== undefined && newClickedCard === lastClicked) {
        //remove cards from array
        cards = cards.filter((card) => card.type !== lastClicked);
        //remove cards from UI
        let cardsToRemove = document.querySelectorAll(`.${lastClicked}`);
        for (card of cardsToRemove) {
          card.remove();
        }
      }
      //rework me to run correctly, make me not run on match
      setTimeout(function () {
        event.target.parentNode.classList.remove("flipped");
      }, 5000);
      //make me undefined or newClicked, depending on match or not
      lastClicked = newClickedCard;
    }
  });
})();
