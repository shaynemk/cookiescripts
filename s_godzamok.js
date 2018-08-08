setInterval(function() {
  var xOfferingsToGodzamok = 6; //how many hundreds to sell/buy
  Game.ObjectsById[0].sell(100*xOfferingsToGodzamok);
  if (FrozenCookies.autoBuy == 0) FrozenCookies.autoBuy = 1;
}, 10100);
