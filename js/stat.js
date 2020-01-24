'use strict';

var CLOUD_HEIGHT = 270; // высота "облачка"
var CLOUD_X = 100; // координата по горизонтали
var CLOUD_Y = 10; // координата по вертикали
var GAP = 10; // отступ
var FONT_GAP = 16; // высота строки текста
var BAR_GAP = 50; // отступ между столбцами
var BAR_WIDTH = 40; // ширина столбца
var TEXT_HEIGHT = CLOUD_Y + 2 * (GAP + FONT_GAP); // высота строк с сообщением о результатах игры
var BAR_HEIGHT = CLOUD_HEIGHT - TEXT_HEIGHT - 3 * GAP - 2 * FONT_GAP; // высота столбца

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + 105, y + 10);
  ctx.lineTo(x + 210, y);
  ctx.lineTo(x + 315, y + 10);
  ctx.lineTo(x + 420, y);
  ctx.lineTo(x + 420, y + 70);
  ctx.lineTo(x + 400, y + 135);
  ctx.lineTo(x + 420, y + 200);
  ctx.lineTo(x + 420, y + 270);
  ctx.lineTo(x + 315, y + 265);
  ctx.lineTo(x + 210, y + 270);
  ctx.lineTo(x + 105, y + 265);
  ctx.lineTo(x, y + 270);
  ctx.lineTo(x, y + 200);
  ctx.lineTo(x + 20, y + 135);
  ctx.lineTo(x, y + 70);
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

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

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, 110, 20, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, 100, 10, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.baseline = 'hanging';
  ctx.fillText('Ура вы победили!', CLOUD_X + 2 * GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + 2 * GAP, TEXT_HEIGHT);

  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    var personalTime = Math.floor(times[i]);
    var personSaturation = Math.floor(Math.random() * 100);

    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), CLOUD_HEIGHT);
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + (personSaturation) + '%, 50%)';
    }
    ctx.fillRect(CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), CLOUD_HEIGHT - BAR_HEIGHT * personalTime / maxTime - GAP - FONT_GAP, BAR_WIDTH, BAR_HEIGHT * personalTime / maxTime);

    ctx.fillStyle = '#000';
    ctx.fillText(personalTime, CLOUD_X + BAR_GAP + i * (BAR_GAP + BAR_WIDTH), CLOUD_HEIGHT - BAR_HEIGHT * personalTime / maxTime - 2 * GAP - FONT_GAP);
  }
};
