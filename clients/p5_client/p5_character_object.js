class BashCharacter {
	constructor(letter, x, y, line_number = 0) {
		this.letter = letter;
		this.x = x;
		this.y = y;
		this.original_x = x;
		this.original_y = y;
		this.line_number = line_number;
		this.animate = false;
	}

	draw() {
		fill(255);
		let current_x = this.original_x;
		let current_y = this.original_y;
		if (this.animate) {
			current_x = this.x + random(-10, 10);
			current_y = this.y + random(-10, 10);
			this.x = current_x;
			this.y = current_y;
		}
		text(this.letter, current_x, current_y);
	}

	startAnimation() {
		this.animate = true;
	}

	stopAnimation() {
		this.animate = false;
	}
}