console.log("Loaded Javascript!");
const ROWS = 20,
	COLS = 20,
	BOMB_COUNT = 25;
let gameOver;
let grid;
let gridDisplay;
let score;
document.addEventListener("DOMContentLoaded", () => {
	gridDisplay = document.querySelector(".grid");
	let btn = document.querySelector("#restart-btn");
	btn.onclick = restart;
	setup();
});
function restart() {
	window.location.reload();
}
function checkForWin() {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			if (!grid[i][j].mine && !grid[i][j].isRevealed) {
				return false;
			}
		}
	}
	return true;
}
function setup() {
	gameOver = false;
	grid = [];
	const bombArray = new Array(BOMB_COUNT).fill("b");
	const normalArray = new Array(ROWS * COLS - BOMB_COUNT).fill("n");
	const totalArray = bombArray.concat(normalArray).sort(() => Math.random() - 0.5);

	score = document.querySelector("#score");
	for (let i = 0; i < ROWS; i++) {
		grid.push([]);
		for (let j = 0; j < COLS; j++) {
			grid[i].push(new Array(COLS));
			grid[i][j] = new Cell(totalArray[i * ROWS + j] == "b" ? true : false);
			let cell = document.createElement("div");
			cell.classList.add("cell");
			cell.location = [ i, j ];
			grid[i][j].child = cell;
			cell.parent = grid[i][j];
			grid[i][j].location = [ i, j ];
			//grid[i][j].reveal();
			cell.addEventListener("click", (e) => {
				if (e.ctrlKey) {
					console.log("Flagging!");
					cell.parent.flag();
					return;
				}
				if (!gameOver) {
					cell.parent.click();
				}
			});
			gridDisplay.appendChild(cell);
		}
	}
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			grid[i][j].checkNeighbours();
			//grid[i][j].reveal();
		}
	}

	// document.addEventListener("click", (e) => {
	//     //console.log(e.target);
	//     e.target.click(e);
	// })
	updateDisplay();
}
function updateDisplay() {
	for (let i = 0; i < grid.length; i++) {
		for (let j = 0; j < grid[i].length; j++) {
			let index = i * COLS + j;
			gridDisplay.children[index].className = grid[i][j].class;
		}
	}
}
