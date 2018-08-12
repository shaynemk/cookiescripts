var Destructo = {};

Destructo.magic = function() {
  var xOfferingsToGodzamok = 6; //how many hundreds to sell/buy
  Game.ObjectsById[0].sell(100 * xOfferingsToGodzamok);
  
  if (typeof FrozenCookies != "undefined" && FrozenCookies.autoBuy === 0) FrozenCookies.autoBuy = 1;
}

Destructo.start = function() {
  Destructo.magic();
  Destructo.intervalID = setInterval(Destructo.magic, 10100);
}

Destructo.stop = function() {
  clearInterval(Destructo.intervalID);
}

Destructo.start();