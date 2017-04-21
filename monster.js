function Monster(monsterID, x, y) {
  this.monsterID = monsterID;
  this.x = x;
  this.y = y;
  this.firstDirection = "";
}

Monster.prototype.randomDirection = function() {
  var startDirection = Math.round(Math.random());
  if (startDirection === 0) {
    this.firstDirection = "right";
  } else {
    this.firstDirection = "left";
  }
  return this.firstDirection;
};

Monster.prototype.move = function(moveX, moveY){
  var nextX = (this.x += moveX);
  var nextY = (this.y += moveY);
  var nextStepX = nextX + "px";
  var nextStepY = nextY + "px";
  $('#'+this.monsterID).css("left", nextStepX);
  $('#'+this.monsterID).css("top", nextStepY);
};
