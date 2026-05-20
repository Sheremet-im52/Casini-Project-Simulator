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

function renderGrid(gridData) {

    grid.innerHTML = "";

    for (let row of gridData) {

        for (let value of row) {

            const cell = document.createElement("div");

            cell.classList.add("cell");

            cell.innerText = value;

            grid.appendChild(cell);
        }
    }
}

function generateGrid() {

    let currentGrid = [];

    for (let i = 0; i < 6; i++) {

        let row = [];

        for (let j = 0; j < 6; j++) {

            const randomIndex = Math.floor(Math.random() * symbols.length);

            const value = symbols[randomIndex];

            row.push(value);
        }

        currentGrid.push(row);
    }

    return currentGrid;
}

spinButton.addEventListener("click", () => {

    spinButton.disabled = true;

    let spinCount = 0;

    const spinAnimation = setInterval(() => {

        const tempGrid = generateGrid();

        renderGrid(tempGrid);

        spinCount++;

        if (spinCount >= 15) {

            clearInterval(spinAnimation);

            const finalGrid = generateGrid();

            renderGrid(finalGrid);

            const result = checkWin(finalGrid);

            balance += result.totalWin;

            balanceText.innerText = "Balance: " + balance;

            resultText.innerText =
                "Total Win: " + result.totalWin;

            addToHistory(result.winLines, result.totalWin);

            spinButton.disabled = false;
        }

    }, 100);
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