(function($){

  var Point = function() {
    if (arguments.length >= 2) {
      this.x = arguments[0];
      this.y = arguments[1];
    } else {
      this.x = null;
      this.y = null;
    }
  };

  // 実際に線をp1からp2までの線を引く関数
  var drawLine = function(ctx, p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  };

  // コッホ曲線の描画
  // params, ctx: canvasの描画オブジェクト, p1: ポイント1, p2: ポイント2, n: 残りの再帰回数
  var draw = function(ctx, p1, p2, n) {

    // ポイントオブジェクトを生成して，値をセット
    var p3 = new Point((2 * p1.x + p2.x) / 3, (2 * p1.y + p2.y) / 3);
    var p4 = new Point((p1.x + 2 * p2.x) / 3, (p1.y + 2 * p2.y) / 3);

    // x,yは2点間の距離x,yでdisは直線距離
    var x = p2.x - p1.x;
    var y = - (p2.y - p1.y);
    var dis = Math.sqrt(x * x + y * y) / Math.sqrt(3);

    // 始点p
    var p5;
    var rad;
    var angle;

    // p1.x-p2.xが正か負かでp5の場所は変わる
    if (x >= 0) {
      // アークタンジェントとrad
      rad = Math.PI / 6;
      angle = Math.atan(y / x) + rad;
      p5 = new Point(p1.x + dis * Math.cos(angle),
		     p1.y - dis * Math.sin(angle));
    } else {
      // アークタンジェントとrad
      rad = - Math.PI / 6;
      angle = Math.atan(y / x) + rad;
      p5 = new Point(p2.x + dis * Math.cos(angle),
		     p2.y - dis * Math.sin(angle));
    }

    // 再帰上限なら線を引いておしまい
    if (n === 0) {
      drawLine(ctx, p1, p3);
      drawLine(ctx, p3, p5);
      drawLine(ctx, p5, p4);
      drawLine(ctx, p4, p2);
      return;
    }
    
    draw(ctx, p1, p3, n - 1);
    draw(ctx, p3, p5, n - 1);
    draw(ctx, p5, p4, n - 1);
    draw(ctx, p4, p2, n - 1);
  };

  // ここからはじまる
  var draw_koch = function(ctx) {
    // コッホ曲線
    var p1 = {x: 10, y: 200};
    var p2 = {x: 490, y: 200};
    var p3 = {x: 245, y: 539};

    draw(ctx, p1, p2, N);
    draw(ctx, p2, p3, N);
    draw(ctx, p3, p1, N);
  };

  var N = 4;

  $.fn.koch_curve = function (canvas_main) {
    var ctx =  canvas_main.getContext('2d');
    draw_koch(ctx);
  };
})(jQuery);
