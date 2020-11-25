const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let card1 = null;
let card2 = null;
let cardsFlipped = 0;

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);
  if(card1 === null) {
    card1 = event.target;
    card1.style.backgroundColor = card1.className
    card1.style.transition = "transform 1s";
    card1.style.transform = "rotateY(180deg)";
  } else if (card1 !== null && card2 === null) {
    card2 = event.target;
    card2.style.backgroundColor = card2.className;
    card2.style.transition = "transform 1s";
    card2.style.transform = "rotateY(180deg)";
    if (card1.className !== card2.className) {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.style.transition = "";
        card1.style.transform = "";
        card2.style.transition = "";
        card2.style.transform = "";
        card1 = null;
        card2 = null;
      }, 1500);
    } else if (card1.className === card2.className) {
      setTimeout(function() {
        card1.style.border = "2px solid yellow";
        card2.style.border = "2px solid yellow";
        cardsFlipped = cardsFlipped + 2;
        card1 = null;
        card2 = null;
        console.log(cardsFlipped)
        if (cardsFlipped < 10) {
          let match = new Audio('electric.mp3');
        match.play();
        } else if(cardsFlipped === 10) {
          let win = new Audio('winner.mp3');
          win.play();
          let winner = document.createElement('p');
          winner.innerText = 'WINNER!!!';
          winner.classList.add('winner');
          let something = document.querySelector('body');
          something.append(winner);
          
        }
      }, 1500)
    }
  }
}

//if this doesn't work, just add it into the logic above for else if
/* card2.addEventListener('change', function(e) {
  console.log('card2 changed!')
}
) */

// when the DOM loads
createDivsForColors(shuffledColors);
