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
Panel.prototype.toggleState =function() {
  this.live = !this.live;
  this.refresh();
};
Panel.prototype.refresh = function() {
  if(this.live) {
    this.context.fillStyle = '#D0A869';
    this.context.fillRect(this.canvas_x, this.canvas_y, this.height, this.width);
    return;
  }
  if(!this.live) {
    this.context.fillStyle = '#111111';
    this.context.fillRect(this.canvas_x, this.canvas_y, this.height, this.width);
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
