setInterval(function() {
  var xOfferingsToGodzamok = 5 //how many to sell/buy
  if (Game.buyBulk != 100) Game.buyBulk = 100;
  for (i=0; i<xOfferingsToGodzamok; i++) {
    Game.ObjectsById[0].sell(xOfferingsToGodzamok);
  }
  for (i=0; i<xOfferingsToGodzamok; i++) {
    Game.ObjectsById[0].buy(xOfferingsToGodzamok);
  }
}, 10100);
