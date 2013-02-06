(function($){

    var board = [];

    var loop = 500;

    var max = 500;

    // size
    var maxX = 800;
    var maxY = 500;

    var med = max/2;

    var positionX = 0.01;
    var positionY = -1.40497;
    var zoon = 0.25;
    // var zoon = 0.000005;
    var colorMax = 0;

  function drawMandelbrot(ctx){
    var a,b,x,y,zx,zy;

    for( var i=0 ; i<maxY ; i++ )
    {
      a = positionY + zoon * ( (i-med) / max );
      board[i] = new Array();
      for( var j=0 ; j<maxX ; j++ )
      {
        b = positionX + zoon * ( (j-med) / max );
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
        board[i][j] = k;
      }
    }

    for(var i = 0; i < board.length; i++) {
      for(var j = 0; j < board[i].length; j++) {
        ctx.beginPath();
        ctx.fillStyle = 'rgb(' + parseInt(board[i][j]/colorMax * 255,10) +
            ',' +
            parseInt(board[i][j]/colorMax * 255, 10) +
            ',' +
            parseInt(board[i][j]/colorMax * 255,10) +
            ')';
        ctx.fillRect(i, j, 1, 1);
        ctx.fill();
      }
    }    
  }

  $.fn.mandelbrot = function (canvas_main) {
    var ctx =  canvas_main.getContext('2d');
    drawMandelbrot(ctx);
  };

})(jQuery);