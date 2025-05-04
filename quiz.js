
// updated DOM
document.addEventListener('DOMContentLoaded', () => {
    // Start the quiz when page loads
    showAllQuestions(); //shows all questions (wow !)
});


const quiz = [ //questions in question, in this case each question choice is linked to a group
    {
      question: "Pick a vacation spot:",
      answers: [
        { text: "Tokyo", group: "Got7" },
        { text: "Chicago", group: "IDLE" },
        { text: "Bangkok", group: "SEVENTEEN" },
        { text: "Seoul", group: "TWICE" }
      ]
    },
    {
      question: "Pick a color:",
      answers: [
        { text: "Green", group: "Got7" },
        { text: "Red", group: "IDLE" },
        { text: "Blue", group: "SEVENTEEN" },
        { text: "Magenta", group: "TWICE" }
      ]
    },
    {
      question: "Pick a snack:",
      answers: [
        { text: "Beef Jerkey", group: "Got7" },
        { text: "Tangerines", group: "IDLE" },
        { text: "Ice Cream", group: "SEVENTEEN" },
        { text: "Raspberries", group: "TWICE" }
      ]
    },
    {
        question: "Pick a flower:",
        answers: [
          { text: "Daisy", group: "Got7" },
          { text: "Orchid", group: "IDLE" },
          { text: "Hibiscus", group: "SEVENTEEN" },
          { text: "Carnation", group: "TWICE" }
        ]
      },
      {
        question: "Pick a hobby:",
        answers: [
          { text: "Dancing", group: "Got7" },
          { text: "Art", group: "IDLE" },
          { text: "Watching Movies", group: "SEVENTEEN" },
          { text: "Baking", group: "TWICE" }
        ]
      }
  ];
  
  let currentQuestion = 0;
  let userAnswers = [];
  
  function showAllQuestions() {
    const questionEl = document.getElementById('question');
    questionEl.innerHTML = ''; // Clear existing content

    quiz.forEach((q, questionIndex) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.id = `question${questionIndex + 1}`;

        questionDiv.innerHTML = `
            <div class="small-box">
                <h2>${q.question}</h2>
            </div>
            <div id="answers-container-${questionIndex}" class="answers-container"></div>
        `;

        const answersContainer = questionDiv.querySelector('.answers-container');

        q.answers.forEach(answer => {
            const btn = document.createElement('button');
            btn.className = 'answer-button';
            btn.textContent = answer.text;

            btn.onclick = function() {
                // Remove 'selected' from other buttons in THIS question only
                answersContainer.querySelectorAll('.answer-button').forEach(b => {
                    b.classList.remove('selected');
                });
                // Add selected to clicked button
                btn.classList.add('selected');
               userAnswers[questionIndex] = answer.group;
            };
            answersContainer.appendChild(btn);
        });

        questionEl.appendChild(questionDiv);
    });

    // Add a submit button at the bottom also linked with css 
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit Quiz';
    submitButton.className = 'submit-button';
    submitButton.onclick = showResults;
    questionEl.appendChild(submitButton);
}
function selectAnswer(group) {
    userAnswers.push(group);
    currentQuestion++;
  
    if (currentQuestion < quiz.length) {
      showAllQuestions();
    } else {
      showResults();
    }
  }
  
  function showResults() {
    const tally = {};
    userAnswers.forEach(group => {
      tally[group] = (tally[group] || 0) + 1;
    });
    // Find highest scoring group
  const max = Math.max(...Object.values(tally));
  const winners = Object.keys(tally).filter(group => tally[group] === max);

  // Choose a random winner if there's a tie
  const winner = winners[Math.floor(Math.random() * winners.length)];

  localStorage.setItem('winner', winner);
  window.location.href = 'result.html';
}