var x = 5
var y = function() { 
	Game.ObjectsById[0].sell(x);
	//Game.ObjectsById[0].sell(x);
	//Game.ObjectsById[0].sell(x);
	//Game.ObjectsById[0].sell(x);
	//Game.ObjectsById[0].sell(x);
	Game.ObjectsById[0].buy(x);
	//Game.ObjectsById[0].buy(x);
	//Game.ObjectsById[0].buy(x);
	//Game.ObjectsById[0].buy(x);
	//Game.ObjectsById[0].buy(x);
	setTimeout(function(){ y() }, 10100);
}
y();
