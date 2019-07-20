// socket io listeners
let socket = io('http://localhost:8080');

socket.on('connect',function() {
  console.log('Client has connected to the server!');
});

socket.on('exit', function(data) {
  addContent(data);
});

socket.on('message', function(data) {
  let data_string = String.fromCharCode.apply(null, new Uint8Array(data));
  addContent(data_string);
});

// p5 canvas
const BLOCKED_KEYS = [...Array(12).keys()].map(x => 112 + x);
const PS0 = "[david@s4n]$ ";

let command_history = [];
let command_history_index = -1;
let canvas_width = 800;
let canvas_height = 600;
let last_input;

let p5_input;
let p5_result;

function setup() {
  createCanvas(canvas_width, canvas_height);
  background(51);

  p5_result = new BashString(PS0, 0, textLeading());
  p5_input = new BashString("", p5_result.width, textLeading());
};

function draw() {
  background(51);
  p5_input.draw();
  p5_result.draw();
}

function enterWasPressed() {
  let input = p5_input.buildString();
  command_history.push(input);
  switch(input) {
    case "clear":
      p5_result.removeAll();
      p5_result.appendString(PS0);
      p5_input.setY(1);
      break;
    case "history":
      last_input = input;
      addContent(concat(command_history, "").join("\n"));
      break;
    case "animate":
      p5_result.animate();
      break;
    case "stopanimate":
      p5_result.stopAnimate();
      break;
    default:
      socket.send(input);
  }
  last_input = input;
  p5_input.removeAll();
}

function keyPressed() {
  if ( BLOCKED_KEYS.indexOf(keyCode) != -1 )
    return;

  switch(keyCode) {
    case ENTER:
      enterWasPressed();
      break;
    case UP_ARROW:
      upArrowWasPressed();
      break;
    case BACKSPACE:
      p5_input.removeLastCharacter();
      break;
    case ALT:
    case CONTROL:
    case DELETE:
    case TAB:
    case ESCAPE:
    case SHIFT:
    case OPTION:
    case DOWN_ARROW:
    case LEFT_ARROW:
    case RIGHT_ARROW:
      break;
    default:
      p5_input.addCharacter(key);
  }
};

function addContent(content) {
  p5_result.appendString(last_input + "\n" + content + PS0);
  let p5_result_line_count = p5_result.getLeadingNewLinesFromIndex(p5_result.length()) + 1;
  p5_input.setY(p5_result_line_count);
};

function upArrowWasPressed() {
  if (command_history_index === -1) 
    command_history_index = command_history.length - 1;
  p5_input.removeAll();
  p5_input.appendString(command_history[command_history_index]);
  command_history_index--;
}