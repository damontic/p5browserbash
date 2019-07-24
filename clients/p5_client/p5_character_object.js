const ANIMATE = 0;
const STOP_ANIMATE = 1;
const STOP = 2;

class BashCharacter {
	constructor(letter, x, y, line_number = 0) {
		this.letter = letter;
		this.x = x;
		this.y = y;
		this.original_x = x;
		this.original_y = y;
		this.line_number = line_number;
		this.animate = STOP;
	}

	draw() {
		switch(this.animate) {
			case ANIMATE:
				this.animateDraw();
				break;
			case STOP_ANIMATE:
				this.stopAnimateDraw();
				break;
			case STOP:
				this.stopDraw();
				break;
		}
	}

	animateDraw() {
		this.x += random(-10, 10);
		this.y += random(-10, 10);
		this.x = constrain(this.x, 0, canvas_width);
		this.y = constrain(this.y, 0, canvas_height);

		fill(255);
		text(this.letter, this.x, this.y);
	}

	stopAnimateDraw() {
		let x_vel = (this.original_x - this.x) > 0 ? 1 : -1;
		this.x += x_vel;

		let y_vel = (this.original_y - this.y) > 0 ? 1 : -1;
		this.y += y_vel;

		if (abs(this.x - this.original_x) < 1 && abs(this.y - this.original_y) < 1) {
			this.x = this.original_x;
			this.y = this.original_y;
			this.animate = STOP;
		}

		fill(255);
		text(this.letter, this.x, this.y);
	}

	stopDraw() {
		fill(255);
		text(this.letter, this.original_x, this.original_y);
	}

	startAnimation() {
		this.animate = ANIMATE;
		this.x = this.original_x;
		this.y = this.original_y;
	}

	stopAnimation() {
		this.animate = STOP_ANIMATE;
	}
}