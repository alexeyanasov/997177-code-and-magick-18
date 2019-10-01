'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_COLOR = '#fff';
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var TEXT_TYPE = '16px PT Mono';
var TEXT_COLOR = '#000';
var HEADER_TITLE = 'Ура вы победили!';
var HEADER_TEXT = 'Список результатов:';
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';
var GAP = 10;
var FONT_GAP = 16;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var MAX_SATURATE = 100;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getRandomNumber = function (num) {
  var rand = Math.round(Math.random() * num);
  return rand;
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 0; i < arr.length; i++) {
    if (maxElement < arr[i]) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  var sumCloudXgap = CLOUD_X + GAP;
  var sumCloudYgap = CLOUD_X + GAP;
  renderCloud(ctx, sumCloudXgap, sumCloudYgap, CLOUD_SHADOW_COLOR);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_COLOR);
  ctx.font = TEXT_TYPE;
  ctx.fillStyle = TEXT_COLOR;

  ctx.fillText(HEADER_TITLE, sumCloudXgap * 2, sumCloudYgap * 3);
  ctx.fillText(HEADER_TEXT, sumCloudXgap * 2, sumCloudYgap * 3 + FONT_GAP);

  var maxTime = Math.round(getMaxElement(times));

  for (var i = 0; i < names.length; i++) {
    var currentBarPositionX = CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var currentBarHeight = (BAR_HEIGHT * times[i]) / maxTime;
    var currentBarPositionY = CLOUD_HEIGHT - (currentBarHeight + GAP + FONT_GAP);
    var currentTime = Math.round(times[i]);
    var saturate = getRandomNumber(MAX_SATURATE);

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], currentBarPositionX, CLOUD_HEIGHT - GAP);

    ctx.fillText(currentTime, currentBarPositionX, currentBarPositionY - GAP);

    if (names[i] === 'Вы') {
      ctx.fillStyle = PLAYER_BAR_COLOR;
    } else {
      ctx.fillStyle = 'hsl(225, ' + saturate + '%, 50%)';
    }
    ctx.fillRect(currentBarPositionX, currentBarPositionY, BAR_WIDTH, currentBarHeight);
  }
};
