const canvas = document.getElementById("canvas");
const data = document.getElementById("data");
const generateButton = document.getElementById("generateButton");
const hexdisplay = document.getElementById("hexdisplay");

const size_width = document.getElementById("size_width");
const size_height = document.getElementById("size_height");
const flag_type = document.getElementById("flag_type");

const root = document.querySelector(":root");

const ctx = canvas.getContext("2d");

function getData() {
  data.value = data.value.toUpperCase().replace(/[^0-9A-F]*/g, "");

  var hexValue = data.value.match(/.{1,2}/g).map((x) => x.padStart(2, "0"));

  hexdisplay.innerHTML = hexValue.join(" ");

  createFlag(
    hexValue.join("").match(/.{1,6}/g),
    size_width.value,
    size_height.value,
    flag_type.value
  );
  // var ac = averageColors(hexValue);
  // console.log(ac);
  // root.style.setProperty(
  //   "--background-color",
  //   arrayToColor(darkenColor(ac, 70))
  // );
  // root.style.setProperty("--color", arrayToColor(lightenColor(ac, 70)));
  // root.style.setProperty("--accent-color", arrayToColor(ac));
  // root.style.setProperty(
  //   "--accent-color-fg",
  //   arrayToColor(lightenColor(ac, 90))
  // );
}
generateButton.addEventListener("click", getData);

function averageColors(hex) {
  var averageSet = [[], [], []];
  hex.forEach((number, index) => {
    averageSet[index % 3].push(parseInt(number, 16));
  });
  return averageSet.map((array) =>
    Math.floor(array.reduce((a, b) => a + b) / array.length)
  );
}

function createFlag(hex, w, h, type) {
  canvas.width = w;
  canvas.height = h;

  // Initialize stuff

  var width = ctx.canvas.width;
  var height = ctx.canvas.height;
  var textHeight = 24;
  ctx.font = `${textHeight}px "Lexend Deca"`;

  ctx.clearRect(0, 0, width, height);

  console.log(hex);

  var hexColors = [];
  var excessHex = "";

  hex.forEach((compound) => {
    if (compound.length < 6) excessHex = compound;
    else hexColors.push(compound);
  });

  var rectWidth = width / hexColors.length;
  var rectHeight = height / hexColors.length;
  for (color in hexColors) {
    ctx.fillStyle = "#" + hexColors[color];
    if (type === "horiz") ctx.fillRect(rectWidth * color, 0, rectWidth, height);
    else if (type === "vert")
      ctx.fillRect(0, rectHeight * color, width, rectHeight);
  }
  if (excessHex.length > 0) {
    var text = "+ " + excessHex.match(/.{1,2}/g).join(" ");
    var textWidth = ctx.measureText(text).width;
    ctx.strokeStyle = "black";
    ctx.lineWidth = 4;
    ctx.fillStyle = "white";
    ctx.strokeText(text, width - (textWidth + 8), height - textHeight / 2);
    ctx.fillText(text, width - (textWidth + 8), height - textHeight / 2);
  }
}

const clamp = (n, mi, ma) => Math.max(mi, Math.min(n, ma));

function lightenColor(color, mult) {
  return [
    clamp(color[0] + (mult / 100) * (255 - color[0]), 0, 255),
    clamp(color[1] + (mult / 100) * (255 - color[1]), 0, 255),
    clamp(color[2] + (mult / 100) * (255 - color[2]), 0, 255),
  ];
}
function darkenColor(color, mult) {
  return [
    clamp(color[0] - (mult / 100) * color[0], 0, 255),
    clamp(color[1] - (mult / 100) * color[1], 0, 255),
    clamp(color[2] - (mult / 100) * color[2], 0, 255),
  ];
}

function arrayToColor(color) {
  return (
    "#" + color.map((x) => Math.floor(x).toString(16).padStart(2, "0")).join("")
  );
}
