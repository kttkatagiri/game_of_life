(function($){

  var Xtable = [];
  var loop = 500;
  var max = 500;
  var med = max/2;
  var PosX = -0.033;
  var PosY = - 1.755;
  var Zoom = 0.079;
  var colorMax = 0;

  function drawBurningShip(ctx){
    var a,b,x,y,zx,zy;

    for( var i=0 ; i<max ; i++ )
    {
      a = PosY + Zoom * ( (i-med) / max );
      Xtable[i] = new Array();
      for( var j=0 ; j<max ; j++)
      {
        b = PosX + Zoom * ( (j-med) / max );
        x=0;y=0;
        for( var k=0 ; k<loop ; k++ )
        {
	  x = Math.abs(x);
	  y = Math.abs(y);

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
        ctx.fillStyle =
            'rgb(' + parseInt(255-Xtable[i][j]/colorMax * 255,10) + ',' +
            parseInt(255-Xtable[i][j]/colorMax * 255, 10) + ',' +
            parseInt(255-Xtable[i][j]/colorMax * 255,10) + ')';
        ctx.fillRect(i, j, 1, 1);
        ctx.fill();
      }
    }
  }

  $.fn.burning_ship = function (canvas_main) {
    var ctx =  canvas_main.getContext('2d');
    drawBurningShip(ctx);
  };
})(jQuery);