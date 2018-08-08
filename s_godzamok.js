var intervalID;

function start() {
  var xOfferingsToGodzamok = 6; //how many hundreds to sell/buy
  Game.ObjectsById[0].sell(100*xOfferingsToGodzamok);
  if (FrozenCookies.autoBuy == 0) FrozenCookies.autoBuy = 1;
}

function stop() {
  clearInterval(intervalID);
}

intervalID = setInterval(start(), 10100);
