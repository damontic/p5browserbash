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
const PS0 = "[david@s4n]$ ";
let input;
let command_history;
let command_history_index;
let vScale;
let input_y;

function setup() {
  input = PS0;
  command_history = [];
  command_history_index = -1;
  vScale = 80 / 100;
  input_y = textSize();

  createCanvas(screen.width * vScale, screen.height * vScale);
  background(0,0,0);
};

function draw() {
  background(0,0,0);
  fill(255, 255, 255);  
  text(input, textSize(), textSize());
}

function enterWasPressed() {
  let com = getCommandFromInput();
  command_history.push(com);
  switch(com) {
    case "clear":
      input = PS0;
      break;
    case "history":
      addContent(command_history.join("\n"));
      break;
    default:
      socket.send(com);
  }
}

function upArrowWasPressed() {
  if (command_history_index === -1) 
    command_history_index = command_history.length - 1;
  let com = getCommandFromInput();
  input = input.substring(0, input.length - 1 - com.length) + " " + command_history[command_history_index];
  command_history_index--;
}

function keyPressed() {
  switch(keyCode) {
    case ENTER:
      enterWasPressed();
      break;
    case UP_ARROW:
      upArrowWasPressed();
      break;
    case BACKSPACE:
      let com = getCommandFromInput();
      if (input.length > input.length - com.length)
        input = input.substring(0, input.length - 1);
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
      input += key;
  }
};

function addContent(content) {
  input = input + "\n" + content + "\n" + PS0;
};

function getCommandFromInput() {
  let regex_result = input.match(/.*\$(.*)$/);
  return regex_result[regex_result.length-1].trim();
}