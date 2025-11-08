let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
const statusDisplay = document.getElementById("status");

const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6] // Diagonal
];

function handleClick(event) {
    const clickedSquare = event.target;
    const squareIndex = clickedSquare.getAttribute("data-index");

    if (board[squareIndex] !== "" || !gameActive) return;

    board[squareIndex] = currentPlayer;
    clickedSquare.textContent = currentPlayer;
    clickedSquare.classList.add(currentPlayer.toLowerCase());

    if (checkWinner()) {
        gameActive = false;
        statusDisplay.textContent = `${currentPlayer} Wins!`;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.textContent = `${currentPlayer}'s Turn`;
}

function checkWinner() {
    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusDisplay.textContent = `${currentPlayer}'s Turn`;

    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.textContent = "";
        square.classList.remove("x", "o");
    });
}

document.querySelectorAll(".square").forEach(square => {
    square.addEventListener("click", handleClick);
});

resetGame();
