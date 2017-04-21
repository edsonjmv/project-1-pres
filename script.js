$(document).ready(function(){

  var score = 0;
  var monsterQuantity = 0;
  var game = new Board();
  var moveAnt = 100;
  var includeAnts = 800;
  var keys = {};

  $('#start-game').on('click', function(){
    $('#start-game').css("visibility", "hidden");

    $(document).keydown(function(e){
      keys[e.keyCode] = true;
      if (keys[38]){
        includeAnts -= 100;
      }
      if (keys[40]){
        includeAnts += 100;
      }
    });

  game.addingMonsters = setInterval(function(){
    var randomID = Math.floor(Math.random() * 1000000);
    var monsterID = randomID;
    var initialX = Math.floor(Math.random() * 800);
    var initialY = Math.floor(Math.random() * 500);
    var monster = new Monster(monsterID, initialX, initialY);
    monster.randomDirection();
    game.addMonster(monster);
    $("#board").append("<div id="+monsterID+" class='monster' style=top:"+initialY+"px;left:"+initialX+"px;></div>");

    if (game.monsterArmy.length == 5) {
      $("#wrong")[0].play();
      $(".game-over").append("<h1>GAME OVER!</h1>");
      $(".game-over").append("<h4>Your score: "+score+"</h4>");
      clearInterval(game.addingMonsters);
      clearInterval(game.addingFruit);
      clearInterval(movingMonster);
    }

    if (game.monsterArmy.length >= 5) {
      $(".game-over").css("visibility", "visible");
      $(".monster").css("visibility", "hidden");
      $(".fruit").css("visibility", "hidden");
      $(".blood").css("visibility", "hidden");
    }

      var dir= monster.randomDirection();
      var moveX = 0;
      var moveY = 5;
      if (dir === "left") moveX = -10;
      else moveX = 10;

      var movingMonster = setInterval(function () {
        monster.move(moveX, moveY);
        if (monster.y <= 0) {
          moveY = 10;
        } else if (monster.y >= 540) {
          moveY =- 10;
        }
        if (monster.x <= 0) {
          moveX = 10;
        } else if (monster.x >= 940) {
          moveX =- 10;
        }
        $("#quantM").html("<h1>"+game.monsterArmy.length+"</h1>");

      }, moveAnt);
  }, includeAnts);

  $(document).on("click", ".monster", function(event) {
    score += 1;
    var identificator = event.currentTarget.id;
    $("#hit-sound")[0].play();
    $("#board").append("<div class='blood'</div>");
    $(".blood").css( {position:"absolute", top:event.pageY, left: event.pageX});
    $("#points").html("<h1>"+score+"</h1>");
    game.monsterArmy.forEach(function(element, index, array){
      if(element.monsterID === parseInt(identificator)) {
        array.splice(index,1);
      }
    });
    this.remove();
  });

  game.addingFruit = setInterval(function(){
  var randomID = Math.floor(Math.random() * 1000000);
  var fruitID = randomID;
    var initialX = Math.floor(Math.random() * 800);
    var initialY = Math.floor(Math.random() * 450);
      var fruit = new Fruit(fruitID, initialX, initialY);
      game.addFruit(fruit);
      $("#board").append("<div id="+fruitID+"  class='fruit' style=top:"+initialY+"px;left:"+initialX+"px;></div>");
      $(".fruit").addClass("animated infinite rubberBand");

      if (game.monsterArmy.length >= 5) {
        $(".fruit").css("visibility", "hidden");
      }
}, 3000);

$(document).on("click", ".fruit", function(event) {
  score -= 5;
  $("#error")[0].play();
  var identifi = event.currentTarget.id;
  $("#points").html("<h1>"+score+"</h1>");
  game.fruitBasket.forEach(function(element, index, array){
    if(element.fruitID === parseInt(identifi)) {
      array.splice(index,1);
    }
  });
    this.remove();
}); // closing click on fruit

var eatenFruits = setInterval(function(){
    if (game.fruitEaten()){
      score -= 20;
    }
}, 50);

}); // closing start game

});  //closing document ready
