(function($) {

  var m_power = false;

  var m_canvas = null;
  var m_ctx = null;
  var m_width = 80;
  var m_height = 50;
  var m_board = [];

  var m_storage = localStorage;

  var check_survive = function(square) {
    // console.log(square);
    var live_count = 0;
    if((square.x - 1) >= 0 && (square.y - 1) >= 0 &&
       m_board[square.x - 1][square.y - 1].live) { ++live_count; }
    if((square.y - 1) >= 0 &&
       m_board[square.x][square.y - 1].live) { ++live_count; }
    if((square.x + 1) < m_width && (square.y - 1)  >= 0 &&
       m_board[square.x + 1][square.y - 1].live) { ++live_count; }

    if((square.x - 1) >= 0  &&
       m_board[square.x - 1][square.y].live) { ++live_count; }
    if((square.x + 1) < m_width &&
       m_board[square.x + 1][square.y].live) { ++live_count; }

    if((square.x - 1) >= 0 && (square.y + 1) < m_height &&
       m_board[square.x - 1][square.y + 1].live) { ++live_count; }
    if((square.y + 1) < m_height &&
       m_board[square.x][square.y + 1].live) { ++live_count; }
    if((square.x + 1 < m_width) && (square.y + 1 < m_height) &&
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
    if(m_power) {
      check_survive_board();
      advance_to_next_stage();
      setTimeout(life_game, 100);
    }
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
    var canvas_width = $(m_canvas).width();
    var s_height = canvas_height / m_height;
    var s_width = canvas_width / m_width;


    var x = parseInt(canvas_x/s_height);
    var y = parseInt(canvas_y/s_width);
    console.log('canvas_click',x,y);
    m_board[x][y].toggleState();
  };

  var init = function () {
    var canvas_height = $(m_canvas).height();
    var canvas_width = $(m_canvas).width();
    var s_height = canvas_height / m_height;
    var s_width = canvas_width / m_width;
    console.log(canvas_height,m_height,s_height);
    console.log(canvas_width,m_width,s_width);

    m_board = [];
    for(var i = 0; i < m_width; ++i) {
      m_board[i] = [];
      for(var j = 0; j < m_height; ++j) {
        m_board[i][j] = new Panel(i, j,
                                  i * s_width, j * s_height,
                                  s_width, s_height,
                                  m_ctx);
        m_board[i][j].refresh();
      }
    }
  };
  var remove_life_game_event = function(){
    m_canvas.removeEventListener('click', canvas_click, false);
  };

  var reset = function() {
    for(var i = 0; i < m_width; ++i) {
      for(var j = 0; j < m_height; ++j) {
        m_board[i][j].dead();
        m_board[i][j].advance();
        m_board[i][j].refresh();
      }
    }
  };

  // 初期化
  $.fn.life_game_init = function (canvas_main) {
    m_canvas = canvas_main;
    m_ctx =  canvas_main.getContext('2d');
    remove_life_game_event();
    init();
    init_event();
  };

  // start
  $.fn.life_game = function() {
    m_power = true;
    life_game();
  };

  // reset
  $.fn.life_game_reset = function() {
    reset();
    m_power = false;
  };
  // stop
  $.fn.life_game_stop = function() {
    m_power = false;
  };
  // exit
  $.fn.life_game_exit = function() {
    m_power = false;
    reset();
    remove_life_game_event();
  };
  
  // save
  $.fn.life_game_save = function(life_text) {
    var output_json = [];
    $.each(m_board, function(i){
      output_json[i] = [];
      $.each(m_board[i], function(j, panel){
        output_json[i][j] = {
          "x":panel.x,
          "y":panel.y,
          "live":panel.live,
          "next":panel.next
        };
      });
    });
    life_text.val(JSON.stringify(output_json).replace("}", "}\n", 'g'));
  };

  // restore
  $.fn.life_game_set_state = function(life_text) {
    var set_data = JSON.parse(life_text.val());
    $.each(set_data, function(i){
      $.each(set_data[i], function(j){
        var data = set_data[i][j];
        m_board[i][j].restore({
          "x":data.x,
          "y":data.y,
          "live":data.live,
          "next":data.next
        });
         m_board[i][j].refresh();
      });
    });
  };

  $.fn.life_game_debug = function () {
    console.log('m_board', m_board);
  };

})(jQuery);