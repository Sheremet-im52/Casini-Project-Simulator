const grid = document.getElementById("grid");

// поле 
for (let i = 0; i < 36; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.innerText = "?";
    grid.appendChild(cell);
}