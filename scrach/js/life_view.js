
/// 初期イベント登録
(function($){
  $(document).ready(function(){

    var m_canvas = $('#canvas_main').get(0);
    m_canvas.width = 1000;
    m_canvas.height = 1000;

    var expandCanvas = function (){
      var b = document.body;
      var d = document.documentElement;
      console.log(b.clientWidth , b.scrollWidth, d.scrollWidth, d.clientWidth);
      m_canvas.width = Math.max(b.scrollWidth, 300);
      m_canvas.height = Math.max(b.scrollWidth, 300);
    };

    $(window).resize(function(){
      console.log('$(window).resize');
      expandCanvas();
      $().life_game_resize();
    });

    expandCanvas();
    $().life_game_init(m_canvas);
    $().life_game_set_state(glider);
    $().life_game();
    
  });
})(jQuery);
