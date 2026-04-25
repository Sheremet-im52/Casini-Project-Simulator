const grid = document.getElementById("grid");
const spinButton = document.getElementById("spin");
const symbols = ["🐶", "🍖", "⭐", "💀", "1", "2", "3", "4", "5", "6", "7"];

function generateGrid() {
    grid.innerHTML = "";

    for (let i = 0; i < 36; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");

        // випадковий символ
        const randomIndex = Math.floor(Math.random() * symbols.length);
        cell.innerText = symbols[randomIndex];

        grid.appendChild(cell);
    }
}
spinButton.addEventListener("click", () => {
    generateGrid();
});