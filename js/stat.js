'use strict';
// координаты облака
var CLOUD_X = 100;
var CLOUD_Y = 10;
// высота облака - 270px, ширина - 420px.
var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var GAP = 10;
// промежутки  между текстом и гистограммой
var INTERVAL = 20;
// ширина колонки - 40px
var BAR_WIDTH = 40;
// расстояние между колонками
var BAR_GAP = 50;
// высота гистограммы  150px
var BAR_HEIGHT = 150;
// координата облачка снизу
var CLOUD_Y_LOW = CLOUD_HEIGHT - CLOUD_Y;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var drawBar = function (ctx, names, times, i, maxTime) {
  ctx.fillText(
      names,
      CLOUD_X + INTERVAL + i * (BAR_GAP + BAR_WIDTH),
      CLOUD_Y_LOW
  );
  ctx.fillRect(
      CLOUD_X + INTERVAL + i * (BAR_GAP + BAR_WIDTH),
      CLOUD_Y_LOW - INTERVAL - (BAR_HEIGHT * times) / maxTime,
      BAR_WIDTH,
      (BAR_HEIGHT * times) / maxTime
  );
  ctx.fillText(
      Math.round(times),
      CLOUD_X + INTERVAL + i * (BAR_GAP + BAR_WIDTH),
      CLOUD_Y_LOW - 3 * GAP - (BAR_HEIGHT * times) / maxTime
  );
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = 'bold 16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили! ', CLOUD_X + GAP, CLOUD_Y + 3 * GAP);
  ctx.fillText('Список результатов: ', CLOUD_X + GAP, CLOUD_Y + 5 * GAP);
  var maxTime = getMaxElement(times);
  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle =
      names[i] === 'Вы'
        ? 'rgba(255, 0, 0, 1)'
        : 'hsl(240,' + Math.random() * 100 + '% ,50%)';
    drawBar(ctx, names[i], times[i], i, maxTime);
  }
};
