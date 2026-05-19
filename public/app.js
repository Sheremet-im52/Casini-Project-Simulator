let balance = 100;

const balanceText = document.getElementById("balance");
const resultText = document.getElementById("result");
const grid = document.getElementById("grid");
const spinButton = document.getElementById("spin");
const symbols = ["🐶", "🍖", "⭐", "💀", "1", "2", "3", "4", "5", "6", "7"];
const historyDiv = document.getElementById("history");

let historyQueue = [];

function addToHistory(winLines, totalWin) {

    historyQueue.push({
        lines: winLines,
        total: totalWin
    });

    if (historyQueue.length > 5) {
        historyQueue.shift();
    }

    renderHistory();
}

function renderHistory() {

    historyDiv.innerHTML = "";

    for (let item of historyQueue) {

        const div = document.createElement("div");

        div.classList.add("history-item");

        let text = "";

        for (let line of item.lines) {
            text += `${line.symbols} → +${line.amount}<br>`;
        }

        text += `<strong>Total: ${item.total}</strong>`;

        div.innerHTML = text;

        historyDiv.appendChild(div);
    }
}

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

    const result = checkWin(gridData);

    balance += result.totalWin;

    balanceText.innerText = "Balance: " + balance;

    resultText.innerText = "Total Win: " + result.totalWin;

    addToHistory(result.winLines, result.totalWin);
});

function checkWin(grid) {

    let totalWin = 0;

    let winLines = [];

    for (let rowIndex = 0; rowIndex < grid.length; rowIndex++) {

        const row = grid[rowIndex];

        for (let i = 0; i < 4; i++) {

            if (
                row[i] === row[i + 1] &&
                row[i] === row[i + 2]
            ) {

                let amount = 0;

                if (row[i] === "🐶") amount = 50;
                else if (row[i] === "🍖") amount = 40;
                else if (row[i] === "⭐") amount = 30;
                else if (row[i] === "💀") amount = 0;
                else amount = 10;

                totalWin += amount;

                winLines.push({
                    symbols: `${row[i]} ${row[i]} ${row[i]}`,
                    amount: amount,
                    row: rowIndex + 1
                });
            }
        }
    }

    return {
        totalWin,
        winLines
    };
}