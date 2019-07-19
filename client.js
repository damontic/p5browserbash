// socket io listeners
let socket = io('http://localhost:8080');

socket.on('connect',function() {
  console.log('Client has connected to the server!');
});

socket.on('exit', function(data) {
  addContent(data);
  updateScreen();
});

socket.on('message', function(data) {
  let data_string = String.fromCharCode.apply(null, new Uint8Array(data));
  addContent(data_string);
  updateScreen();
});

// p5 html management
let input, prompt, PS0 = "[david@s4n]$ ";
let command_history = [];
let command_history_index = -1;

function setup() {
  noCanvas();
  let body = select("body");
  body.style("background", "#000000");

  initInput();
};

function enterWasPressed() {
  command_history.push(input.value());
  switch(input.value()) {
    case "clear":
      removeElements();
      updateScreen();
      break;
    case "history":
      addContent([PS0 + "history"].concat(command_history).join("\n"));
      updateScreen();
      break;
    default:
      socket.send(input.value());
  }
}

function upArrowWasPressed() {
  if (command_history_index === -1) 
    command_history_index = command_history.length - 1;
  input.value(command_history[command_history_index]);
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
  }
};

function mouseClicked() {
  input.elt.focus();
}
      
function initInput() {
  prompt = createP(PS0);
  prompt.style("color", "#ffffff");
  prompt.style("background", "#000000");
  prompt.style("font-size", "16px");

  input = createInput();
  input.style("border", "none");
  input.style("outline", "none");
  input.style("color", "#ffffff");
  input.style("caret-color", "#ffffff");
  input.style("background", "#000000");
  input.style("font-size", "16px");

  prompt.child(input);
  input.elt.focus();
}

function addContent(bashOutput) {
  let p = createP(bashOutput);
  p.style("white-space", "pre-wrap");
  p.style("color", "#ffffff");
  p.style("font-size", "16px");
};

function updateScreen() {
  input.remove();
  prompt.remove();
  initInput();

  window.scroll(0, Number.MAX_SAFE_INTEGER);
}