const COOKIE = document.getElementById("COOKIE");
const COOKAMNT = document.getElementById("CookiesAmnt");
const UPGCLICKER = document.getElementById("upclicker");
const COOKPS = document.getElementById("CookiesPSec");
COOKIE.addEventListener("click", CookieClick);
UPGCLICKER.addEventListener("click", () => BuyUpgrade("AC"));
let cookies = 0;
let perClick = 1;
let cookiesPerSec = 0;
let autoclickers = 0;
let acprice = 2;

function UpdateScreen() {
  setInterval(function () {
    COOKAMNT.textContent = Math.round(cookies) + " Cookies";
    COOKPS.textContent = cookiesPerSec.toFixed(1) + " Cookies /s";
    UPGCLICKER.textContent =
      "Autoclicker\n" + acprice + " Cookies" + " (Owned: " + autoclickers + ")";
    cookiesPerSec = autoclickers * 0.1;
    perClick = 1 + autoclickers * 0.1;
  }, 100);
}

function AutoClick() {
  setInterval(function () {
    cookies = cookies + cookiesPerSec;
  }, 1000);
}

function CookieClick(event) {
  cookies = cookies + perClick;
  const particle = document.createElement("div");
  particle.textContent = "+" + Math.trunc(perClick);
  particle.className = "particle";
  particle.style.left = event.clientX - 20 + Math.random() * 5 + "px";
  particle.style.top = event.clientY - 30 + "px";
  document.querySelector(".cookie-container").appendChild(particle);
  setTimeout(() => {
    particle.remove();
  }, 1000);
  COOKIE.classList.add("clicked");
  setTimeout(() => {
    COOKIE.classList.remove("clicked");
  }, 100);
}

function BuyUpgrade(which) {
  if (which === "AC") {
    if (cookies >= acprice) {
      autoclickers = autoclickers + 1;
      cookies = cookies - acprice;
      acprice = Math.round(15 * Math.pow(1.15, autoclickers));
    }
  }
}

UpdateScreen();
AutoClick();
