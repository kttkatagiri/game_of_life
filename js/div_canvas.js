
/// 初期イベント登録
(function($){
  $(document).ready(function(){

    var m_select_draw = $(this).val();
    var m_canvas = $('#canvas_main').get(0);

    $('#draw_select').change(function(){
      m_select_draw = $(this).val();
    });
    $('#draw_button').click(function() {
      switch(m_select_draw) {
      case 'life':
        console.log('$().life_game();');
        $().life_game_init(m_canvas);
        break;
      case 'koch':
        console.log('koch_curve');
        $().koch_curve(m_canvas);
        break;
      case 'mandel':
        console.log('mandelbrot');
        $().mandelbrot(m_canvas);
        break;
      case 'burning':
        $().burning_ship(m_canvas);
        break;
      }
    });

    $('#start_life').click(function(){
      $().life_game();
    });
  });
})(jQuery);
