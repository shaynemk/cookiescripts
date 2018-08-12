var AA = {};

AA.init = function() {
  var pantheon = Game.Objects.Temple.minigame;
  var godMazok = Game.Objects.Temple.minigame.gods.ruin;
  var godMuridal = Game.Objects.Temple.minigame.gods.labor;
}

AA.checkForEgg = function() {
  // check for chocolate egg
  return (!Game.Upgrades["Chocolate egg"].unlocked || !Game.Upgrades["Chocolate egg"].canBuy());
}

AA.disableHelpers = function() {
  // disable FC && godzamok scripts
  if (typeof FrozenCookies != "undefined") FrozenCookies.autoBuy = 0;
  if (typeof Destructo != "undefined") Destructo.stop();
}

AA.enableHelpers = function() {
  // enable FC & Godzamok scripts
  FrozenCookies.autoBuy = 1;
  Destructo.start();
}

AA.sellAll = function() {
  // sell everything
  for (var x = 0; x < Game.ObjectsById.length; x++) {
    Game.ObjectsById[x].sell(-1);
  }
  // Game.ObjectsById.foreach (function (b){
  //   b.sell(-1);
  // });
}

AA.buyChocEgg = function() {
  // buy chocolate egg
  Game.Upgrades["Chocolate egg"].buy();
}

AA.upAndBack= function() {
  // ascend and return
  Game.Ascend(true);
  Game.Reincarnate (true);
}

AA.setIdols = function() {
  // set the gods in pantheon
  pantheon.slot[0]=godMazok.id;
  pantheon.slot[1]=godMuridal.id;
}

AA.buyAllUpgrades = function() {
  Game.storeBuyAll();
}

AA.ascend = function() {
  if (!AA.checkForEgg) Game.Note("Angelic Ascension Error", "Chocolate Egg either not available or can't buy it, aborting.");
  else {
    AA.init();
    
    AA.disableHelpers();
    
    AA.sellAll();
    
    AA.buyChocEgg();
    
    AA.upAndBack();
    
    AA.enableHelpers();
    
    AA.setIdols();
    
    setTimeout(clearInterval(setInterval(AA.buyAllUpgrades,5),1000 * 20)); // buy all upgrades every 5 seconds for 20 seconds
  }
}

Game.Note("Angelic Ascension","Angelic Ascension has loaded. Run 'AA.ascend();' in the console to ascend.");