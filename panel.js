
var Panel = function(x, y,
                     canvas_x, canvas_y,
                     height, width,
                     context) {

  this.context = context;
  
  this.x = x;
  this.y = y;

  this.canvas_x = canvas_x;
  this.canvas_y = canvas_y;
  this.height = height;
  this.width = width;

  this.live = false;
  this.next = false;
};
Panel.prototype.resize = function(canvas_x, canvas_y, panel_size){
  this.canvas_x = canvas_x;
  this.canvas_y = canvas_y;
  this.height = panel_size;
  this.width = panel_size;
};

Panel.prototype.restore = function (restore_data) {
  this.x = restore_data.x;
  this.y = restore_data.y;
  this.live = restore_data.live;
  this.next = restore_data.next;
  this.refresh();
};
Panel.prototype.toggleState = function() {
  this.live = !this.live;
  this.refresh();
};
Panel.prototype.refresh = function() {
  if(this.live) {
    this.context.fillStyle = '#00da7a';
    this.context.fillRect(this.canvas_x, this.canvas_y, this.height, this.width);
    this.context.fillStyle = '#00fa9a';
    this.context.fillRect(this.canvas_x + 1, this.canvas_y + 1, this.height - 2, this.width -2);
    return;
  }
  if(!this.live) {
    this.context.fillStyle = '#444444';
    this.context.fillRect(this.canvas_x, this.canvas_y, this.height, this.width);
    this.context.fillStyle = '#333333';
    this.context.fillRect(this.canvas_x + 1, this.canvas_y + 1, this.height - 2, this.width -2);
    return;
  }  
};
Panel.prototype.isLive = function() {
  return this.live;  
};
Panel.prototype.advance = function() {
  this.live = this.next;
  this.refresh();
};

Panel.prototype.survive = function () {
  this.next = true;
};
Panel.prototype.spawn = function () {
  this.next = true;      
};
Panel.prototype.dead = function () {
  this.next = false;
};
