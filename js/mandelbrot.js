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

  var drawLine = function(ctx, p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  };

  function drawMandelbrot(ctx){
    var a,b,x,y,zx,zy;
    var Xtable = [];

    var loop = 500;

    var max = 500;

    // size
    var maxX = 500;
    var maxY = 700;
    var med = max/2;

    // var PosX = 0.0099;
    var PosX = 0.01;
    var PosY = -1.40497;
    var Zoom = 0.25;
    // var Zoom = 0.000005;

    var colorMax = 0;

    for( var i=0 ; i<maxY ; i++ )
    {
      a = PosY + Zoom * ( (i-med) / max );
      Xtable[i] = new Array();
      for( var j=0 ; j<maxX ; j++ )
      {
        b = PosX + Zoom * ( (j-med) / max );
        x=0;y=0;
        for( var k=0 ; k<loop ; k++ )
        {
          zx = x*x-y*y+a;
          zy = 2*x*y+b;
          x = zx;
          y = zy;
          if( x*x+y*y>4 ) break;
        }
        if(colorMax < k){ colorMax = k; }
        Xtable[i][j] = k;
      }
    }

    for(var i = 0; i < Xtable.length; i++) {
      for(var j = 0; j < Xtable[i].length; j++) {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(' + parseInt(Xtable[i][j]/colorMax * 255,10) +
            ',' +
            parseInt(Xtable[i][j]/colorMax * 255, 10) +
            ',' +
            parseInt(Xtable[i][j]/colorMax * 255,10) +
            ')';
        ctx.fillRect(i, j, 1, 1);
        ctx.fill();
        // ctx.stroke();
      }
    }    
  }

  $.fn.mandelbrot = function (canvas_main) {
    var ctx =  canvas_main.getContext('2d');
    drawMandelbrot(ctx);
  };

})(jQuery);