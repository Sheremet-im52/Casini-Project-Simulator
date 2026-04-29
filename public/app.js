let balance = 100;

const balanceText = document.getElementById("balance");
const resultText = document.getElementById("result");
const grid = document.getElementById("grid");
const spinButton = document.getElementById("spin");
const symbols = ["🐶", "🍖", "⭐", "💀", "1", "2", "3", "4", "5", "6", "7"];

function generateGrid() {
    grid.innerHTML = "";

    let currentGrid = [];

    for (let i = 0; i < 6; i++) {
        let row = [];

        for (let j = 0; j < 6; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            const randomIndex = Math.floor(Math.random() * symbols.length);
            const value = symbols[randomIndex];

            cell.innerText = value;
            grid.appendChild(cell);

            row.push(value);
        }

        currentGrid.push(row);
    }

    return currentGrid;
}
spinButton.addEventListener("click", () => {

    const gridData = generateGrid();

    const win = checkWin(gridData);

    balance += win;

    balanceText.innerText = "Balance: " + balance;

    resultText.innerText = "Win: " + win;
});
function checkWin(grid) {
    let win = 0;
    for (let row of grid) {
        for (let i = 0; i < 4; i++) {
            if (row[i] === row[i+1] && row[i] === row[i+2]) {

                if (row[i] === "🐶") win += 50;
                else if (row[i] === "🍖") win += 40;
                else if (row[i] === "⭐") win += 30;
                else if (row[i] === "💀") win += 0;
                else win += 10;
            }
        }
    }

    return win;
}