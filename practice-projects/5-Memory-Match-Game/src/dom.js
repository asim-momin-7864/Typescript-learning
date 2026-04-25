// Import your exported logic from the compiled file
import { startGame, flipCardStatus, timeTicker } from '../dist/memory-match-core.js';

const gameBoard = document.getElementById('game-board');
const timeText = document.getElementById('time-text');
const resetBtn = document.getElementById('reset-btn');

let currentCardsArray = [];
let uiTimerInterval = null;

function initGame() {
  // 1. Get a fresh shuffled board from your engine
  currentCardsArray = startGame(); 
  
  // 2. Reset the UI Timer Text visually
  timeText.innerText = "00:30";

  // 3. Clear any old intervals to prevent double-speed ticking
  if (uiTimerInterval) clearInterval(uiTimerInterval);

  // 4. Start the new UI loop
  uiTimerInterval = setInterval(() => {
    // Let your engine handle the math and formatting
    const timeObj = timeTicker(currentCardsArray);
    
    // Update the screen with the formatted text your engine sent back
    if (timeObj) {
      timeText.innerText = `${timeObj.min}:${timeObj.sec}`;
      
      // Stop the UI interval if time hits zero
      if (timeObj.min === "00" && timeObj.sec === "00") {
        clearInterval(uiTimerInterval);
        alert("Time's up! Game Over!");
      }
    }
  }, 1000);

  // 5. Draw the initial board
  renderBoard();
}

function renderBoard() {
  if (!gameBoard) return;
  gameBoard.innerHTML = '';

  currentCardsArray.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    
    // Read the status from your TypeScript objects!
    if (card.status === 'Flipped') {
      cardElement.classList.add('flipped');
    } else if (card.status === 'Matched') {
      cardElement.classList.add('matched');
    }

    cardElement.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${card.symbole}</div>
      </div>
    `;

    // Send click events to your engine
    cardElement.addEventListener('click', () => {
      if (card.status === 'Hidden') {
        flipCardStatus(card.cardId, currentCardsArray); 
        renderBoard(); // Redraw with the new state
      }
    });

    gameBoard.appendChild(cardElement);
  });
}

// Connect the button
resetBtn.addEventListener('click', initGame);

// Start the game on initial load
initGame();