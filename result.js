
const winner = localStorage.getItem('winner');

const resultsInfo = {
  Got7: {
    description: "You're full of energy and love a good beat!",
    image: "Got7.jpg"
  },
  IDLE: {
    description: "You're fierce, fabulous, and stylish!",
    image: "Idle.jpg"
  },
  SEVENTEEN: {
    description: "You love creativity and edgy music!",
    image: "SEVENTEEN.jpg"
  },
  TWICE: {
    description: "You bring sunshine and smiles wherever you go!",
    image: "TWICE.jpg"
  }
};

if (winner && resultsInfo[winner]) {
  document.getElementById('group-name').textContent = winner;
  document.getElementById('group-description').textContent = resultsInfo[winner].description;
  document.getElementById('group-image').src = resultsInfo[winner].image;
} else {
  document.getElementById('group-name').textContent = "Oops!";
  document.getElementById('group-description').textContent = "We couldn't find your result.";
}

function restartQuiz() {
  window.location.href = 'start.html';
}
