class Cell {
	constructor(isBomb) {
		this.class = "cell ";
		this.mine = isBomb;
		this.neighbours = [];
		this.mineCount = 0;
		this.isRevealed = false;
		this.flagged = false;
	}
	reveal() {
		if (this.isRevealed || this.flagged) return;
		this.isRevealed = true;
		//console.log("revealed");
		let neighbourCount = document.createElement("span");
		neighbourCount.classList.add("number");
		switch (this.mineCount) {
			case 1:
				neighbourCount.classList.add("one");
				break;
			case 2:
				neighbourCount.classList.add("two");
				break;
			case 3:
				neighbourCount.classList.add("three");
				break;
			case 4:
				neighbourCount.classList.add("four");
				break;
			case 5:
				neighbourCount.classList.add("five");
				break;
			case 6:
				neighbourCount.classList.add("six");
				break;
			case 7:
				neighbourCount.classList.add("seven");
				break;
			case 8:
				neighbourCount.classList.add("eight");

			default:
				break;
		}
		neighbourCount.innerHTML = this.mine || this.mineCount == 0 ? " " : this.mineCount;
		this.child.appendChild(neighbourCount);
		this.class += "revealed ";
		if (this.mine) {
			let mine = document.createElement("div");
			mine.classList.add("mine");
			this.child.appendChild(mine);
		}
	}
	flag() {
		this.flagged = !this.flagged;
		if (this.flagged) {
			this.class += "flagged";
		} else {
			this.class = this.class.replace("flagged", "");
		}
		updateDisplay();
	}
	checkNeighbours() {
		if (this.mine) return;
		for (let i = -1; i <= 1; i++) {
			for (let j = -1; j <= 1; j++) {
				const x = this.location[0] + i;
				const y = this.location[1] + j;
				if (x < 0 || x > grid.length - 1 || y < 0 || y > grid.length - 1) continue;
				this.neighbours.push(grid[x][y]);

				if (grid[x][y].mine == true) {
					this.mineCount++;
				}
			}
		}
	}
	click() {
		if (this.isRevealed || this.flagged) return;
		if (this.mine) {
			for (let i = 0; i < grid.length; i++) {
				for (let j = 0; j < grid[i].length; j++) {
					if (grid[i][j].mine) {
						grid[i][j].class = grid[i][j].class.replace("flagged", "");
						grid[i][j].flagged = false;

						grid[i][j].reveal();
					}
				}
			}
			updateDisplay();
			gameOver = true;
			setTimeout(() => {
				alert("GameOver!");
			}, 200);
			return;
		}
		if (this.mineCount == 0) {
			this.reveal();
			for (let i = 0; i < this.neighbours.length; i++) {
				if (!this.neighbours[i].mine) {
					score.innerHTML++;
					setTimeout(() => {
						this.neighbours[i].click();
						updateDisplay();
					}, 1);
				}
			}
		} else {
			score.innerHTML++;
			this.reveal();
		}
		updateDisplay();
		if (checkForWin()) {
			setTimeout(() => {
				alert("You Won!");
			}, 100);
		}
	}
}
