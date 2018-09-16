var Destructo = {};

Destructo.magic = function() {
  if (Game.Objects.Temple.minigame.gods.ruin.slot != -1 && Game.Objects.Temple.minigame.gods.ruin.slot != "undefined") {
    Game.Objects.Cursor.sell(100 * xOfferingsToGodzamok);
    Game.Objects.Cursor.buy(100 * xOfferingsToGodzamok);
  }
  //if (typeof FrozenCookies != "undefined" && FrozenCookies.autoBuy === 0) FrozenCookies.autoBuy = 1;
}

Destructo.start = function() {
  if (Destructo.xOfferingsToGodzamok == "undefined") Destructo.xOfferingsToGodzamok = 6; //how many hundreds to sell/buy
  Destructo.intervalID = setInterval(Destructo.magic, 10100);
}

Destructo.stop = function() {
  clearInterval(Destructo.intervalID);
}

Destructo.start();