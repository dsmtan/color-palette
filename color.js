"use strict";

/* 
color formats: 
hex #0000ff;
rgb(r,g,b);
hsl(hue, saturation %, light %);
*/

let colorPicker = document.querySelector("#colorPicker");
let stylePicker = document.querySelector("#stylePicker");

let box1 = document.querySelector("#box1");
let box2 = document.querySelector("#box2");
let box3 = document.querySelector("#box3"); //base box
let box4 = document.querySelector("#box4");
let box5 = document.querySelector("#box5");

window.addEventListener("load", init, false);

function init() {
  colorPicker.value = "#ffffff";
  colorPicker.addEventListener("input", updateColors, false);
  stylePicker.addEventListener("input", updateColors, false);
}

function updateColors() {
  //background color box3 changes to input color
  let hexColor = colorPicker.value; //returns hexcolor in string
  box3.style.backgroundColor = hexColor;

  //call function hexToRGB conversion to get values of r, g, b
  let baseR = hexToRGB(hexColor)[0];
  let baseG = hexToRGB(hexColor)[1];
  let baseB = hexToRGB(hexColor)[2];

  console.log(baseR, baseG, baseB);

  // call function rgbToHSL to convert baseRGB values to hsl
  let baseH = rgbToHSL(baseR, baseG, baseB).h;
  let baseS = rgbToHSL(baseR, baseG, baseB).s;
  let baseL = rgbToHSL(baseR, baseG, baseB).l;

  console.log(baseH, baseS, baseL);

  // run relative function of the selected harmony style
  if (stylePicker.value === "analogous") {
    analogous(baseH, baseS, baseL);
  } else if (stylePicker.value === "monochromatic") {
    monochromatic(baseH, baseS, baseL);
  } else if (stylePicker.value === "triad") {
    triad(baseH, baseS, baseL);
  } else if (stylePicker.value === "complementary") {
    complementary(baseH, baseS, baseL);
  } else if (stylePicker.value === "compound") {
    compound(baseH, baseS, baseL);
  } else if (stylePicker.value === "shades") {
    shades(baseH, baseS, baseL);
  }
}

//convert hexcolor to RGB
function hexToRGB(hexcode) {
  let r = parseInt(hexcode.substring(1, 3), 16);
  let g = parseInt(hexcode.substring(3, 5), 16);
  let b = parseInt(hexcode.substring(5, 7), 16);

  return [r, g, b];
}

//RGB to HSL conversion by Peter (I have no idea what's happening in here)

function rgbToHSL(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }

  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  // console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  return {
    h: h,
    s: s,
    l: l
  };
}

//harmony style functions -- default is analogous function

function analogous(h, s, l) {
  let hBox1 = h + 60;
  let hBox2 = h + 45;
  let hBox4 = h + 15;
  let hBox5 = h + 30;

  box1.style.backgroundColor = "hsl(" + hBox1 + ", " + s + "%, " + l + "%)";
  box2.style.backgroundColor = "hsl(" + hBox2 + ", " + s + "%, " + l + "%)";
  box4.style.backgroundColor = "hsl(" + hBox4 + ", " + s + "%, " + l + "%)";
  box5.style.backgroundColor = "hsl(" + hBox5 + ", " + s + "%, " + l + "%)";
}

// monochromatic function
function monochromatic(h, s, l) {
  let lBox1 = l - 20;
  let lBox2 = l - 10;
  let lBox4 = l + 10;
  let lBox5 = l + 20;

  box1.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + lBox1 + "%)";
  box2.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + lBox2 + "%)";
  box4.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + lBox4 + "%)";
  box5.style.backgroundColor = "hsl(" + h + ", " + s + "%, " + lBox5 + "%)";
}

// triad function
function triad(h, s, l) {
  let hBox2 = h - 120;
  let hBox4 = h + 120;

  box1.style.backgroundColor = "white";
  box2.style.backgroundColor = "hsl(" + hBox2 + ", " + s + "%, " + l + "%)";
  box4.style.backgroundColor = "hsl(" + hBox4 + ", " + s + "%, " + l + "%)";
  box5.style.backgroundColor = "white";
}

// complementary function
function complementary(h, s, l) {
  let hBox2 = h + 180;

  box1.style.backgroundColor = "white";
  box2.style.backgroundColor = "hsl(" + hBox2 + ", " + s + "%, " + l + "%)";
  box4.style.backgroundColor = "white";
  box5.style.backgroundColor = "white";
}

// compound function (analogous and complementary combi)
function compound(h, s, l) {
  let hBox1 = h + 30;
  let hBox2 = h + 20;
  let hBox4 = h - 10;
  let hBox5 = h + 180;

  box1.style.backgroundColor = "hsl(" + hBox1 + ", " + s + "%, " + l + "%)";
  box2.style.backgroundColor = "hsl(" + hBox2 + ", " + s + "%, " + l + "%)";
  box4.style.backgroundColor = "hsl(" + hBox4 + ", " + s + "%, " + l + "%)";
  box5.style.backgroundColor = "hsl(" + hBox5 + ", " + s + "%, " + l + "%)";
}

//shades function
function shades(h, s, l) {
  let sBox1 = s - 70;
  let sBox2 = s - 50;
  let sBox4 = s - 20;
  let sBox5 = s - 30;

  box1.style.backgroundColor = "hsl(" + h + ", " + sBox1 + "%, " + l + "%)";
  box2.style.backgroundColor = "hsl(" + h + ", " + sBox2 + "%, " + l + "%)";
  box4.style.backgroundColor = "hsl(" + h + ", " + sBox4 + "%, " + l + "%)";
  box5.style.backgroundColor = "hsl(" + h + ", " + sBox5 + "%, " + l + "%)";
}
