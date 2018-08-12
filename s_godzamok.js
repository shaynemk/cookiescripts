var Pete = {};

Pete.magic = function() {
  var xOfferingsToGodzamok = 6; //how many hundreds to sell/buy
  Game.ObjectsById[0].sell(100 * xOfferingsToGodzamok);
  
  if (typeof FrozenCookies != "undefined" && FrozenCookies.autoBuy === 0) FrozenCookies.autoBuy = 1;
}

Pete.start = function() {
  Pete.magic();
  Pete.intervalID = setInterval(Pete.magic, 10100);
}

Pete.stop = function() {
  clearInterval(Pete.intervalID);
}

Pete.start();