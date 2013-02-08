(function($){

  // params, ctx: canvasの描画オブジェクト, p1: ポイント1, p2: ポイント2, n: 残りの再帰回数
  var draw = function(ctx, p1, p2, n) {

    var p3 = new Point((2 * p1.x + p2.x) / 3, (2 * p1.y + p2.y) / 3);
    var p4 = new Point((p1.x + 2 * p2.x) / 3, (p1.y + 2 * p2.y) / 3);

    var x = p2.x - p1.x;
    var y = - (p2.y - p1.y);
    var dis = Math.sqrt(x * x + y * y) / Math.sqrt(3);

    var p5;
    var rad;
    var angle;

    if (x >= 0) {
      rad = Math.PI / 6;
      angle = Math.atan(y / x) + rad;
      p5 = new Point(p1.x + dis * Math.cos(angle),
		     p1.y - dis * Math.sin(angle));
    } else {
      rad = - Math.PI / 6;
      angle = Math.atan(y / x) + rad;
      p5 = new Point(p2.x + dis * Math.cos(angle),
		     p2.y - dis * Math.sin(angle));
    }

    if (n === 0) {
      $draw.line(ctx, p1, p3);
      $draw.line(ctx, p3, p5);
      $draw.line(ctx, p5, p4);
      $draw.line(ctx, p4, p2);
      return;
    }
    
    draw(ctx, p1, p3, n - 1);
    draw(ctx, p3, p5, n - 1);
    draw(ctx, p5, p4, n - 1);
    draw(ctx, p4, p2, n - 1);
  };

  // ここからはじまる
  var draw_koch = function(ctx) {
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
