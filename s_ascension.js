var AA = {};
AA.krumblor = {};

AA.ascend = function() {
  if ((!Game.Upgrades["Chocolate egg"].unlocked || !Game.Upgrades["Chocolate egg"].canBuy())) Game.Note("Angelic Ascension: Error", "Chocolate Egg either not available or can't buy it, aborting.");
  else {
    // disable FC && godzamok scripts
    if (typeof FrozenCookies != "undefined") FrozenCookies.autoBuy = 0;
    if (typeof Destructo != "undefined") Destructo.stop();
    if (typeof fj != "undefined") fj.stop();
    
    // set bldg sell bonus for krumblor
    Game.dragonAura = AA.krumblor.ascendAura;

    // sell everything
    for (var x = 0; x < Game.ObjectsById.length; x++) {
      Game.ObjectsById[x].sell(-1);
    }

    // buy chocolate egg
    Game.Upgrades["Chocolate egg"].buy();

    // ascend and then wait to return and complete
    Game.Ascend(true);
    
    setTimeout(function(){
      // return
      Game.Reincarnate (true);
      
      // enable FC & Godzamok scripts
      FrozenCookies.autoBuy = 1;
      Destructo.start();
      fj.start();

      // set the gods in pantheon
      AA.pantheon.slot[0]=AA.godMazok.id;
      AA.pantheon.slot[1]=AA.godMuridal.id;

      // buy all upgrades every 5 seconds for 20 seconds
      AA.intervalID = setInterval(Game.storeBuyAll(),1000*5)
      setTimeout(clearInterval(AA.intervalID,1000 * 20)); 

      // start with easter season to get the chocolate egg for when we next ascend
      if (Game.Upgrades["Bunny biscuit"].unlocked && Game.Upgrades["Bunny biscuit"].bought === 0) Game.Upgrades["Bunny biscuit"].buy()

      // train krumblor and set the bonuses
      setTimeout(AA.krumblor.train(),1000*60*2);
    },1000*10); // delay for the ascension animation
  }
}

AA.krumblor.train = function() {
  if (Game.Upgrades["A crumbly egg"].unlocked && !Game.Upgrades["A crumbly egg"].bought) Game.Upgrades["A crumbly egg"].buy();
  
  for(x=Game.dragonLevel;x<Game.dragonLevels.length;x++) {
    Game.UpgradeDragon();
  }
  
  Game.dragonAura2 = AA.krumblor.aura1;
  Game.dragonAura = AA.krumblor.aura2;
}

// init AA
AA.pantheon = Game.Objects.Temple.minigame;
AA.godMazok = Game.Objects.Temple.minigame.gods.ruin;
AA.godMuridal = Game.Objects.Temple.minigame.gods.labor;
AA.debugPrefix = "[Angelic Ascension] ";

// init krumblor
AA.krumblor.aura1 = 1; // breath of milk
AA.krumblor.aura2 = 15; // radiant appetite
AA.krumblor.ascendAura = 5; // earth shatterer

// notify user in console how to operate
console.log(AA.debugPrefix+"Run 'AA.ascend();' to ascend.");