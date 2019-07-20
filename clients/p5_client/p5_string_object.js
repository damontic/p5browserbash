class BashString {
	constructor(sentence, x, y, caret = false) {
		this.bash_characters = [];
		this.x = x;
		this.y = y;
		this.width = 0;

		let sb = Array(sentence.length);
		for (var i = 0; i < sentence.length; i++) {
			this.addCharacter(sentence[i]);
			sb[i] = sentence[i];
		}
		this.s = sb.join("");
	}

	draw() {
		for (var i = 0; i < this.bash_characters.length; i++) {
			this.bash_characters[i].draw();
		}
	}

	addCharacter(k) {
		this.width += textWidth(k);

		let current_index = this.bash_characters.length;

		let new_line_count = this.getLeadingNewLinesFromIndex(current_index);
		let char_y = this.y + new_line_count * textLeading();

		let char_x = this.x + this.getCurrentLineSizeFromRowNumber(new_line_count, current_index);

		let bash_character = new BashCharacter(k, char_x, char_y, new_line_count);
		this.bash_characters.push(bash_character);
	}

	removeLastCharacter() {
		if (this.bash_characters.length > 0) {
			this.bash_characters.pop();
		}
	}

	appendString(sentence) {
		for (var i = 0; i < sentence.length; i++) {
			this.addCharacter(sentence[i]);
		}
	}

	setY(new_y) {
		this.y = new_y * textLeading();
		for (var i = 0; i < this.bash_characters.length; i++) {
			this.bash_characters[i].y = this.y;
		}
	}

	removeAll() {
		this.bash_characters.length = 0;
	}

	getLeadingNewLinesFromIndex(current_index) {
		let new_line_count = 0;
		for (var i = 0; i < this.bash_characters.length; i++) {
			if (this.bash_characters[i].letter === "\n")
				new_line_count += 1;
		}
		return new_line_count;
	}

	getCurrentLineSizeFromRowNumber(row_line, current_index) {
		let total_size = 0;
		for (var i = 0 ; i < this.bash_characters.length; i++) {
			if (this.bash_characters[i].line_number == row_line)
				total_size += textWidth(this.bash_characters[i].letter);
		}
		return total_size;
	}

	length() {
		return this.bash_characters.length;
	}

	buildString() {
		if (this.s.length == this.bash_characters.length)
			return this.s;
		
		let sb = Array(this.bash_characters.length);
		for (var i = 0; i < this.bash_characters.length; i++) {
			sb[i] = this.bash_characters[i].letter;
		}
		return sb.join("");
	}

	animate() {
		for (var i = 0; i < this.bash_characters.length; i++) {
			this.bash_characters[i].startAnimation();
		}
	}

	stopAnimate() {
		for (var i = 0; i < this.bash_characters.length; i++) {
			this.bash_characters[i].stopAnimation();
		}
	}
}