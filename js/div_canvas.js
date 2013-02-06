
/// 初期イベント登録
(function($){
  $(document).ready(function(){

    var m_select_draw = $('#draw_select').val('');;
    var m_canvas = $('#canvas_main').get(0);
    var m_life_text = $('#life_text');

    $('#draw_select').change(function(){
      m_select_draw = $(this).val();
      switch(m_select_draw) {
      case 'life':
        showLife();
        console.log('$().life_game();');
        break;
      case 'koch':
        hideLife();
        $().life_game_stop();
        console.log('koch_curve');
        break;
      case 'mandel':
        hideLife();
        $().life_game_stop();
        console.log('mandelbrot');
        break;
      case 'burning':
        hideLife();
        $().life_game_stop();
        break;
      }
    });

    var showLife = function() {
      $('#start_life').show();
      $('#reset_life').show();
      $('#stop_life').show();
      $('#exit_life').show();
      $('#save_life').show();
      $('#restore_life').show();
      $('#pentadecathlon').show();
      $('#glider').show();
    };
    var hideLife = function() {
      $('#start_life').hide();
      $('#reset_life').hide();
      $('#stop_life').hide();
      $('#exit_life').hide();
      $('#save_life').hide();
      $('#restore_life').hide();
      $('#pentadecathlon').hide();
      $('#glider').hide();
    };
    hideLife();

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

    $('#delete_button').click(function() {
      var ctx = m_canvas.getContext('2d');
      ctx.fillStyle = '#eeeeee';
      ctx.fillRect(0, 0, 500, 500);
    });

    $('#start_life').click(function(){
      $().life_game();
    });
    $('#reset_life').click(function(){
      $().life_game_reset();
    });
    $('#stop_life').click(function(){
      $().life_game_stop();
    });
    $('#exit_life').click(function(){
      $.fn.life_game_exit();
    });
    $('#save_life').click(function(){
      $().life_game_save(m_life_text);
    });
    $('#restore_life').click(function(){
      $().life_game_set_state(m_life_text);
    });
    $('#pentadecathlon').click(function(){
      m_life_text.val(JSON.stringify(pentadecathlon));
      $().life_game_set_state(m_life_text);
    });
    $('#glider').click(function(){
      m_life_text.val(JSON.stringify(glider));
      $().life_game_set_state(m_life_text);
    });
    
  });
})(jQuery);
