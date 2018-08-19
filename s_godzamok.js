var Destructo = {};

Destructo.magic = function() {
  var xOfferingsToGodzamok = 6; //how many hundreds to sell/buy
  Game.Objects.Cursor.sell(100 * xOfferingsToGodzamok);
  Game.Objects.Cursor.buy(100 * xOfferingsToGodzamok);
  //if (typeof FrozenCookies != "undefined" && FrozenCookies.autoBuy === 0) FrozenCookies.autoBuy = 1;
}

Destructo.start = function() {
  Destructo.intervalID = setInterval(Destructo.magic, 10100);
}

Destructo.stop = function() {
  clearInterval(Destructo.intervalID);
}

Destructo.start();