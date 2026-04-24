// Import your exported logic from the compiled JS file
import { cardsArray, flipCardStatus } from '../dist/memory-match-core.js';

const gameBoard = document.getElementById('game-board');

function renderBoard() {
  // Clear the board first
  if (!gameBoard) return;
  gameBoard.innerHTML = '';

  // Loop through your state array to build the UI
  cardsArray.forEach((card) => {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    
    // Apply CSS classes based on YOUR logic state
    if (card.status === 'Flipped') {
      cardElement.classList.add('flipped');
    } else if (card.status === 'Matched') {
      cardElement.classList.add('matched');
    }

    // Build the 3D card structure
    cardElement.innerHTML = `
      <div class="card-inner">
        <div class="card-front">?</div>
        <div class="card-back">${card.symbole}</div>
      </div>
    `;

    // Connect the click event to your engine
    cardElement.addEventListener('click', () => {
      // Only send a click if the card is hidden
      if (card.status === 'Hidden') {
        flipCardStatus(card.cardId); // YOUR logic runs
        renderBoard(); // Redraw the UI with the new state
      }
    });

    // Add to the DOM
    gameBoard.appendChild(cardElement);
  });
}

// Initial render when the page loads
renderBoard();