'use strict';

/** the height of the cloud
* @constant {number} */
var CLOUD_HEIGHT = 270;

/** coordinate x of the cloud rendering start
* @constant {number} */
var CLOUD_X = 100;

/** coordinate y of the cloud rendering start
* @constant {number} */
var CLOUD_Y = 10;

/** indent
* @constant {number} */
var GAP = 10;

/** the height of the text line
* @constant {number} */
var FONT_GAP = 16;

/** indent between columns
* @constant {number} */
var BAR_GAP = 50;

/** column width
* @constant {number} */
var BAR_WIDTH = 40;

/** height of text lines
* @constant {number} */
var TEXT_HEIGHT = CLOUD_Y + 2 * (GAP + FONT_GAP);

/** column height
* @constant {number} */
var BAR_HEIGHT = CLOUD_HEIGHT - TEXT_HEIGHT - 3 * GAP - 2 * FONT_GAP;

var coords = [
  {x: 100, y: 10},
  {x: 205, y: 20},
  {x: 310, y: 20},
  {x: 415, y: 20},
  {x: 520, y: 10},
  {x: 500, y: 145},
  {x: 520, y: 210},
  {x: 520, y: 280},
  {x: 415, y: 275},
  {x: 310, y: 280},
  {x: 205, y: 275},
  {x: 100, y: 280},
  {x: 100, y: 210},
  {x: 120, y: 145},
  {x: 100, y: 80}
];

/**
* draw a polygon block.
* @param {string} ctx - the context of the canvas that is created in the game.js file
* @param {number} x - the abscissa
* @param {number} y - the ordinate
* @param {string} color - fill color
*/
var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  coords.forEach(function (coord) {
    ctx.lineTo(coord.x, coord.y);
  });
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

/**
* find the maximum element.
* @param {Array} arr - array of numbers
* @return {number} return maximum element
*/
var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] === undefined) {
      break;
    }
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

/**
* player statistics.
* @param {string} ctx - the context of the canvas that is created in the game.js file
* @param {Array} names - array of players that is created in the game.js file
* @param {Array} times - array of numbers that is created in the game.js file
*/
window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.baseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 2 * GAP, TEXT_HEIGHT);

  var maxTime = getMaxElement(times);
  names.forEach(function (name, i) {
    var personalTime = Math.floor(times[i]);
    var personSaturation = Math.floor(Math.random() * 100);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), CLOUD_HEIGHT);
    ctx.fillStyle = names[i] === 'Вы' ? 'rgba(255, 0, 0, 1)' : 'hsl(240, ' + personSaturation + '%, 50%)';
    ctx.fillRect(CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), CLOUD_HEIGHT - BAR_HEIGHT * personalTime / maxTime - GAP - FONT_GAP, BAR_WIDTH, BAR_HEIGHT * personalTime / maxTime);

    ctx.fillStyle = '#000';
    ctx.fillText(personalTime, CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), CLOUD_HEIGHT - BAR_HEIGHT * personalTime / maxTime - 2 * GAP - FONT_GAP);
  });
};
