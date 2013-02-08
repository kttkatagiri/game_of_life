
var Point = function() {
  if (arguments.length >= 2) {
    this.x = arguments[0];
    this.y = arguments[1];
  } else {
    this.x = null;
    this.y = null;
  }
};

var $draw = {};
// 線をp1からp2までの線を引く関数
$draw.line = function(ctx, p1, p2) {
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
};
