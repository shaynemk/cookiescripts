var AA = {};

AA.ascend = function() {
  if (!(!Game.Upgrades["Chocolate egg"].unlocked || !Game.Upgrades["Chocolate egg"].canBuy())) Game.Note("Angelic Ascension: Error", "Chocolate Egg either not available or can't buy it, aborting.");
  else {
    // init AA
    AA.pantheon = Game.Objects.Temple.minigame;
    AA.godMazok = Game.Objects.Temple.minigame.gods.ruin;
    AA.godMuridal = Game.Objects.Temple.minigame.gods.labor;
    
    // disable FC && godzamok scripts
    if (typeof FrozenCookies != "undefined") FrozenCookies.autoBuy = 0;
    if (typeof Destructo != "undefined") Destructo.stop();

    // sell everything
    for (var x = 0; x < Game.ObjectsById.length; x++) {
      Game.ObjectsById[x].sell(-1);
    }

    // buy chocolate egg
    Game.Upgrades["Chocolate egg"].buy();

    // ascend and return
    Game.Ascend(true);
    Game.Reincarnate (true);

    // enable FC & Godzamok scripts
    FrozenCookies.autoBuy = 1;
    Destructo.start();

    // set the gods in pantheon
    AA.pantheon.slot[0]=AA.godMazok.id;
    AA.pantheon.slot[1]=AA.godMuridal.id;

    // help FC with the sheer speed of upgrades available
    Game.storeBuyAll();
    setTimeout(clearInterval(setInterval(Game.storeBuyAll(),5),1000 * 20)); // buy all upgrades every 5 seconds for 20 seconds
  }
}

console.log("Run 'AA.ascend();' to ascend.");