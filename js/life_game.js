(function($) {

  var m_canvas = null;
  var m_ctx = null;
  var m_width = 50;
  var m_height = 50;
  var m_board = [];

  var check_survive = function(square) {
    // console.log(square);
    var live_count = 0;
    if((square.x - 1) >= 0 && (square.y - 1) >= 0 &&
       m_board[square.x - 1][square.y - 1].live) { ++live_count; }
    if((square.y - 1) >= 0 &&
       m_board[square.x][square.y - 1].live) { ++live_count; }
    if((square.x + 1) < 50 && (square.y - 1)  >= 0 &&
       m_board[square.x + 1][square.y - 1].live) { ++live_count; }

    if((square.x - 1) >= 0  &&
       m_board[square.x - 1][square.y].live) { ++live_count; }
    if((square.x + 1) < 50 &&
       m_board[square.x + 1][square.y].live) { ++live_count; }

    if((square.x - 1) >= 0 && (square.y + 1) < 50 &&
       m_board[square.x - 1][square.y + 1].live) { ++live_count; }
    if((square.y + 1) < 50 &&
       m_board[square.x][square.y + 1].live) { ++live_count; }
    if((square.x + 1 < 50) && (square.y + 1 < 50) &&
       m_board[square.x + 1][square.y + 1].live) { ++live_count; }

    if (!square.live && live_count === 3) {
      square.spawn();
      return;
    }
    if (square.live && (live_count === 2 || live_count === 3)) {
      square.survive();
      return;
    }
    if (square.live && live_count <= 1) {
      square.dead();
      return;
    }
    if (square.live && live_count >= 4) {
      square.dead();
      return;
    }
    square.dead();
    return;
  };
  var check_survive_board = function () {
    // console.log('m_board', m_board);
    for(var i = 0; i < m_width; ++i) {
      for(var j = 0; j < m_height; ++j) {
        check_survive(m_board[i][j]);
      }
    }
  };
  var advance_to_next_stage = function () {
    for(var i = 0; i < m_width; ++i) {
      for(var j = 0; j < m_height; ++j) {
        m_board[i][j].advance();
      }
    }
  };

  var life_game = function() {
    check_survive_board();
    advance_to_next_stage();
    setTimeout(life_game, 100);
  };

  var init_event = function () {
    m_canvas.addEventListener('click', canvas_click, false);
  };
  var canvas_click = function(event) {
    var click_x = event.pageX;
    var click_y = event.pageY;
    // console.log('canvas_click',click_x,click_y);
    var canvasOffsetX = m_canvas.offsetLeft;
    var canvasOffsetY = m_canvas.offsetTop;
    // console.log('canvas_click',canvasOffsetX,canvasOffsetY);

    var canvas_x = click_x - canvasOffsetX;
    var canvas_y = click_y - canvasOffsetY;
    // console.log('canvas_click',canvas_x,canvas_y);

    var canvas_height = $(m_canvas).height();
    var s_height = canvas_height / m_height;

    var x = parseInt(canvas_x/s_height);
    var y = parseInt(canvas_y/s_height);
    console.log('canvas_click',x,y);
    m_board[x][y].toggleState();
  };

  var init = function () {
    var canvas_height = $(m_canvas).height();
    var s_height = canvas_height / m_height;
    console.log(canvas_height,m_height,s_height);
    m_board = [];
    for(var i = 0; i < m_height; ++i) {
      m_board[i] = [];
      for(var j = 0; j < m_height; ++j) {
        m_board[i][j] = new Panel(i, j,
                                  i * s_height, j * s_height,
                                  s_height, s_height,
                                  m_ctx);
      }
    }
  };

  var remove_life_game_event = function(){
    m_canvas.removeEventListener('click', canvas_click, false);
  };

  $.fn.life_game_init = function (canvas_main) {
    m_canvas = canvas_main;
    m_ctx =  canvas_main.getContext('2d');
    init();
    init_event();
    m_ctx.fillStyle = '#111111';
    m_ctx.fillRect(0, 0, 500, 500);

    // life_game();
  };
  $.fn.life_game = function() {
    life_game();
  };
  $.fn.life_game_debug = function () {
    console.log('m_board', m_board);
  };

})(jQuery);