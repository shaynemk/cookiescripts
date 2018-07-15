var x = 5 //how many to sell/buy
var y = function() { 
  for (i=0; i<x; i++) {
    Game.ObjectsById[0].sell(x);
  }
  for (i=0; i<x; i++) {
    Game.ObjectsById[0].buy(x);
  }
  setTimeout(function(){ y() }, 10100);
}
y();
