(function () {
  //array of card objects
  // let cards = [
  //   {
  //     imageLink: "MCImgs/egypt_kitty_social.jpg",
  //     //id: 1,
  //     isClicked: false,
  //     type = "chillin"
  //   },
  //   {
  //     imageLink: "MCImgs/newFile-4.jpg",
  //     //id: 2,
  //     isClicked: false,
  //     type = "pharoah"
  //   },
  // ];

  //find game board
  const board = document.querySelector("#gameboard");

  //for loop through card object array
  // for (let i = 0; i < cards.length; i++) {
  //   board.innerHTML += `
  //     <div class="card" data-card="${cards[0].type}">
  //     <img class="back" src="MCImgs/Oak-Leaf-Back.jpg" alt="back of card" />
  //     <img class="front" src="${cards[i].imageLink}" alt="cat1" />
  //     </div>
  //   `;
  //   cards[0].id = 0;
  // }
  //add card to DOM

  // const card = document.querySelector('.card');
  board.addEventListener("click", (event) => {
    //check if a card is clicked

    console.log(event.target.parentNode.dataset.card);
    event.target.parentNode.classList.add("flipped");
    setTimeout(function () {
      event.target.parentNode.classList.remove("flipped");
    }, 5000);
  });
})();
