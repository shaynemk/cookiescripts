var FireBreathID;

function fireDragonMagic() {
  var xOfferingsToGodzamok = 6; //how many hundreds to sell/buy
  Game.ObjectsById[0].sell(100*xOfferingsToGodzamok);
  if (FrozenCookies.autoBuy == 0) FrozenCookies.autoBuy = 1;
  //console.log("Destruction was had by all who opposed.");
}

function startTheFire() {
  fireDragonMagic();
  FireBreathID = setInterval(fireDragonMagic, 10100);
}

function stopTheFire() {
  clearInterval(FireBreathID);
}

startTheFire();
