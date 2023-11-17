const canvas = document.getElementById("canvas");
const data = document.getElementById("data");
const generateButton = document.getElementById("generateButton");
const hexdisplay = document.getElementById("hexdisplay");

const steam_game = document.getElementById("steam_game");
const scott_index = document.getElementById("scott_index");
const stash = document.getElementById("stash");
const align = document.getElementById("align");

const root = document.querySelector(":root");

const ctx = canvas.getContext("2d");

async function loadImage(url) {
  return new Promise((r) => {
    let img = new Image();
    img.onload = () => r(img);
    img.src = url;
  });
}

async function getScott() {
  var gameID = steam_game.value;
  var scottID = scott_index.value;
  var alignment = align.value;

  const ctx = canvas.getContext("2d");

  var hero = await loadImage(
    `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameID}/library_hero.jpg`
  ).catch(() => "404");
  var scott = await loadImage(
    stash.checked ? `public/wozstash.png` : `public/woz${scottID}.png`
  ).catch(() => "404");
  var logo = await loadImage(
    `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameID}/logo.png`
  ).catch(() => "404");

  if (scott === "404") {
    console.log("Scott error: " + scottID);
    return `Scott ID ${scottID} does not exist.`;
  }
  if (hero === "404" || logo === "404") {
    console.log("404 error: " + gameID);
    return `Steam ID ${gameID} does not have logo, hero image, or does not exist.`;
  }
  var xalign;
  switch (alignment) {
    case "left":
      xalign = 0;
      break;
    case "right":
      xalign = -950;
      break;
    default:
      xalign = -505;
      break;
  }
  console.log("Generating: " + gameID);
  ctx.drawImage(hero, xalign, 0, 2229, 720);
  ctx.drawImage(scott, 0, 0, 1280, 720);

  const newHeight = 800 / (logo.width / logo.height);
  ctx.fillStyle = "#000";
  ctx.shadowColor = "#000";
  ctx.shadowBlur = 16;

  if (stash.checked)
    ctx.drawImage(
      logo,
      400,
      Math.min(560 - newHeight / 2, 669 - newHeight),
      800,
      newHeight
    );
  else
    ctx.drawImage(logo, 64, Math.max(240 - newHeight / 2, 32), 800, newHeight);
}

generateButton.addEventListener("click", getScott);
