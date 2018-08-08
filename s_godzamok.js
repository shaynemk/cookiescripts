var intervalID;

function runTheMagic() {
  var xOfferingsToGodzamok = 6; //how many hundreds to sell/buy
  Game.ObjectsById[0].sell(100*xOfferingsToGodzamok);
  if (FrozenCookies.autoBuy == 0) FrozenCookies.autoBuy = 1;
}

function start() {
  intervalID = setInterval(runTheMagic(), 10100);
}

function stop() {
  clearInterval(intervalID);
}

start();
