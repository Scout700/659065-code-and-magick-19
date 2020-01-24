'use strict';

/** constants.
 * @name CLOUD_HEIGHT - height polygon block
 * @name CLOUD_X - the starting point of the coordinates on the horizontal
 * @name CLOUD_Y - starting point of vertical coordinates
 * @name GAP - indent
 * @name FONT_GAP - the height of the text line
 * @name BAR_GAP - indent between columns
 * @name BAR_WIDTH - column width
 * @name TEXT_HEIGHT - height of lines with a message about the results of the game
 * @name BAR_HEIGHT = the height of the column
 */

var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 16;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var TEXT_HEIGHT = CLOUD_Y + 2 * (GAP + FONT_GAP);
var BAR_HEIGHT = CLOUD_HEIGHT - TEXT_HEIGHT - 3 * GAP - 2 * FONT_GAP;

/** draw a polygon block.
 * @param {string} ctx - the context of the canvas that is created in the game.js file
 * @param {number} x - the abscissa
 * @param {number} y - the ordinate
 * @param {string} color - fill color
 */

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 10.5 * GAP, y + GAP);
  ctx.lineTo(x + 21 * GAP, y);
  ctx.lineTo(x + 31.5 * GAP, y + GAP);
  ctx.lineTo(x + 42 * GAP, y);
  ctx.lineTo(x + 42 * GAP, y + 7 * GAP);
  ctx.lineTo(x + 40 * GAP, y + 13.5 * GAP);
  ctx.lineTo(x + 42 * GAP, y + 20 * GAP);
  ctx.lineTo(x + 42 * GAP, y + 27 * GAP);
  ctx.lineTo(x + 31.5 * GAP, y + 26.5 * GAP);
  ctx.lineTo(x + 21 * GAP, y + 27 * GAP);
  ctx.lineTo(x + 10.5 * GAP, y + 26.5 * GAP);
  ctx.lineTo(x, y + 27 * GAP);
  ctx.lineTo(x, y + 20 * GAP);
  ctx.lineTo(x + 2 * GAP, y + 13.5 * GAP);
  ctx.lineTo(x, y + 7 * GAP);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

/** find the maximum element.
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

/** player statistics.
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
  names.forEach(function (item, i) {
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
