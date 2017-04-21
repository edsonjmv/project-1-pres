function Board(monster, fruit) {
  this.monster = monster;
  this.fruit = fruit;
  this.monsterArmy = [];
  this.fruitBasket = [];
  this.score= 0;
}

Board.prototype.fruitEaten = function() {
   var that = this;
   this.monsterArmy.forEach(function(e){
     var monsterY = $("#"+e.monsterID).css("top").slice(0,-2);
     var monsterX = $("#"+e.monsterID).css("left").slice(0,-2);
     that.fruitBasket.forEach(function(f){
       var fruitY = $("#"+f.fruitID).css("top").slice(0,-2);
       var fruitX = $("#"+f.fruitID).css("left").slice(0,-2);

       if (monsterX < fruitX + 80 &&
         monsterX + 65 > fruitX &&
         monsterY < fruitY + 65 &&
         80 + monsterY > fruitY) {
           console.log('collision');
        }

     });
   });
};

Board.prototype.addMonster = function(monster) {
  this.monsterArmy.push(monster);
};

Board.prototype.takingMonster = function(monster) {
  this.monsterArmy.splice(monster.monsterID);
};

Board.prototype.addFruit = function(fruit) {
  this.fruitBasket.push(fruit);
};

Board.prototype.addingMonsters = function(){};

Board.prototype.addingFruits = function(){};

Board.prototype.gameOver = function(){};
