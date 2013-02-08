
/// 初期イベント登録
(function($){
  function resize(){
    $('#canvas_main').attr({height:$("#div_canvas").width()});
    $('#canvas_main').attr({width:$("#div_canvas").width()});
  }

  $(document).ready(function(){
    var m_canvas = $('#canvas_main').get(0);
    m_canvas.width = 1000;
    m_canvas.height = 1000;

    $(window).resize(function() {
      resize();
      $().life_game_resize();
    });

    resize();
    $().life_game_init(m_canvas);
    $().life_game_set_state(glider);
    $().life_game();
    
  });
})(jQuery);
